let utopian = require("utopian-api");
let colors = require('colors');
let shuffle = require('shuffle-array');
let fs = require("fs");

let node = process.argv[0].split("\\")[process.argv[0].split("\\").length - 1];
let script = process.argv[1].split("\\")[process.argv[1].split("\\").length - 1];
let arguments = process.argv.slice(2);

if (arguments.length !== 1) {
  console.log("Missing number of accounts to include in the table.".red);
  console.log("Usage: ".red + node.green + " " + script.yellow + " 5-20".cyan)
} else {
  Promise.all([
    utopian.getSponsors(),
    utopian.getModerators()
  ]).then((result) => {
    let sponsorTable = buildTable("sponsor", shuffle(result[0].results).slice(0,parseInt(arguments[0])));
    let modTable = buildTable("moderator", shuffle(result[1].results).slice(0,parseInt(arguments[0])));
    let template = fs.readFileSync("./static/postTemplate.md").toString();
    template = template.replace("%sponsors%", sponsorTable);
    template = template.replace("%moderators%", modTable);
    fs.writeFileSync("./static/archive/postTemplate.md", template);
    console.log("Template saved to: ".green + "./static/archive/postTemplate.md")
  });
}


function getModeratorRow(moderator) {
  return '<td><center><img src="https://utopian.plus/avatar/' + moderator.account + '.png?round=true&size=50" style="border-radius:50%;"><br /><a target="_blank" href="//utopian.io/@' + moderator.account + '">@' + moderator.account + '</a></center></td>';
}

function getSponsorRow(sponsor) {
  let row = '<td><center><img src="https://utopian.plus/avatar/' + sponsor.account + '.png?round=true&size=50" style="border-radius:50%;"><br /><a target="_blank" href="//utopian.io/@' + sponsor.account + '">@' + sponsor.account + '</a>';
  if (sponsor.is_witness) {
    row = row + ' - <a target="_blank" href="//v2.steemconnect.com/sign/account-witness-vote?witness=' + sponsor.account + '&approve=1">Vote Witness</a>';
  }
  row = row + '</center></td>';
  return row;
}

function buildTable(mode, data) {
  let table = '<table><tr>'

  if (mode === "moderator") {
    for (i = 0; i < data.length; i++) {
      if (i % 2 === 0) {
        table = table + '</tr><tr>';
      }
      table = table + getModeratorRow(data[i]);
    }
  } else {
    for (i = 0; i < data.length; i++) {
      if (i % 2 === 0) {
        table = table + '</tr><tr>';
      }
      table = table + getSponsorRow(data[i]);
    }
  }

  if (table.substr(table.length - 5) !== '</tr>') {
    table = table + '</tr>';
  }

  table = table + '</table>';

  return table;
}
