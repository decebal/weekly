<center>![header.png](https://steemitimages.com/DQmeJMFbZ76XVMy5RLP6StyUKXCh6DHVFyBWJLTRZ96FgdK/header.png)</center>

# <center>{{ data.numbering }}</center>

### <center>**[Utopian.io](https://utopian.io) presents this week's most interesting open source projects and the best contributions from our community.**</center>

<hr />

<center>**Want to receive the Utopian Weekly in your inbox? <a href="http://eepurl.com/c-TKu1">Subscribe</a>**</center>

# <center>Top Projects</center>

### [{{ data.projects[0].github.name }}]({{ data.projects[0].project_url }}) ({{ data.projects[0].count }} Contributions)
{{ data.projects[0].github.description }}

[![{{ data.projects[0].github.name }}](https://res.cloudinary.com/hpiynhbhq/image/upload/v1510150908/xx4shp2yiekby5d6sify.png)]({{ data.projects[0].project_url }})

<table>
<tr>
<td>

### [{{ data.projects[1].github.name }}]({{ data.projects[1].project_url }}) ({{ data.projects[1].count }} Contributions)
{{ data.projects[1].github.description }}

[![{{ data.projects[1].github.name }}](https://res.cloudinary.com/hpiynhbhq/image/upload/v1510150908/xx4shp2yiekby5d6sify.png)]({{ data.projects[1].project_url }})

</td>
<td>

### [{{ data.projects[2].github.name }}]({{ data.projects[2].project_url }}) ({{ data.projects[2].count }} Contributions)
{{ data.projects[2].github.description }}

[![{{ data.projects[2].github.name }}](https://res.cloudinary.com/hpiynhbhq/image/upload/v1510150908/xx4shp2yiekby5d6sify.png)]({{ data.projects[2].project_url }})

</td>
</tr>
</table>

# <center>Top Newcomers</center>
#

<table><tr><td>

### [{{ data.newcomers[0].github.name }}]({{ data.newcomers[0].project_url }}) ({{ data.newcomers[0].count }} Contributions)
{{ data.newcomers[0].github.description }}

[![{{ data.newcomers[0].github.name }}](https://res.cloudinary.com/hpiynhbhq/image/upload/v1510150908/xx4shp2yiekby5d6sify.png)]({{ data.newcomers[0].project_url }})

</td><td>

### [{{ data.newcomers[1].github.name }}]({{ data.newcomers[1].project_url }}) ({{ data.newcomers[1].count }} Contributions)
{{ data.newcomers[1].github.description }}

[![{{ data.newcomers[1].github.name }}](https://res.cloudinary.com/hpiynhbhq/image/upload/v1510150908/xx4shp2yiekby5d6sify.png)]({{ data.newcomers[1].project_url }})

</td></tr></table>

<table><tr><td>

### [{{ data.newcomers[2].github.name }}]({{ data.newcomers[2].project_url }}) ({{ data.newcomers[2].count }} Contributions)
{{ data.newcomers[2].github.description }}

[![{{ data.newcomers[2].github.name }}](https://res.cloudinary.com/hpiynhbhq/image/upload/v1510150908/xx4shp2yiekby5d6sify.png)]({{ data.newcomers[2].project_url }})

</td><td>

### [{{ data.newcomers[3].github.name }}]({{ data.newcomers[3].project_url }}) ({{ data.newcomers[3].count }} Contributions)
{{ data.newcomers[3].github.description }}

[![{{ data.newcomers[3].github.name }}](https://res.cloudinary.com/hpiynhbhq/image/upload/v1510150908/xx4shp2yiekby5d6sify.png)]({{ data.newcomers[3].project_url }})


</td></tr></table>

# <center>Top 10 Contributions</center>
#

{% for contribution in data.contributions %}
[{{ contribution.title }}]({{ contribution.utopian_url }})
by [{{ contribution.author }}](https://utopian.io/@{{ contribution.author }}), {{ contribution.active_votes | length }} Upvotes, {{ contribution.rewards | number_format(2) }} SBD

{% endfor %}

<hr />

#### A Special Thanks to The Sponsors

{{ specialThanks('sponsor', data.moderators) }}

A list of all our sponsors can be found on [utopian.io/sponsors](https://utopian.io/sponsors)

### A Special Thanks to The Moderators

{{ specialThanks('moderator', data.moderators) }}

A list of all our moderators can be found on [utopian.io/moderators](https://utopian.io/moderators)
