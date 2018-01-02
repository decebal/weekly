<center>![header.png](https://steemitimages.com/DQmeJMFbZ76XVMy5RLP6StyUKXCh6DHVFyBWJLTRZ96FgdK/header.png)</center>

# <center>{{ data.numbering }}</center>

### <center>**[Utopian.io](https://utopian.io) presents this week's most interesting open source projects and the best contributions from our community.**</center>

<hr />

<center>**Want to receive the Utopian Weekly in your inbox? <a href="http://eepurl.com/c-TKu1">Subscribe</a>**</center>

# <center>Top Projects</center>

<table><tr><td>

### [{{ data.projects[0].github.name }}]({{ data.projects[0].project_url }}) ({{ data.projects[0].count }} Contributions)
{{ data.projects[0].github.description }}

[![{{ data.projects[0].github.name }}](${PROJECT_1_IMAGE})]({{ data.projects[0].project_url }})

</td></tr></table>

<table><tr><td>

### [{{ data.projects[1].github.name }}]({{ data.projects[1].project_url }}) ({{ data.projects[1].count }} Contributions)
{{ data.projects[1].github.description }}

[![{{ data.projects[1].github.name }}](${PROJECT_1_IMAGE})]({{ data.projects[1].project_url }})

</td><td>

### [{{ data.projects[2].github.name }}]({{ data.projects[2].project_url }}) ({{ data.projects[2].count }} Contributions)
{{ data.projects[2].github.description }}

[![{{ data.projects[2].github.name }}](${PROJECT_1_IMAGE})]({{ data.projects[2].project_url }})

</td></tr></table>

# <center>Top Newcomers</center>
#

<table><tr><td>

### [{{ data.newcomers[0].github.name }}]({{ data.newcomers[0].project_url }}) ({{ data.newcomers[0].count }} Contributions)
{{ data.newcomers[0].github.description }}

[![{{ data.newcomers[0].github.name }}](${PROJECT_1_IMAGE})]({{ data.newcomers[0].project_url }})

</td><td>

### [{{ data.newcomers[1].github.name }}]({{ data.newcomers[1].project_url }}) ({{ data.newcomers[1].count }} Contributions)
{{ data.newcomers[1].github.description }}

[![{{ data.newcomers[1].github.name }}](${PROJECT_1_IMAGE})]({{ data.newcomers[1].project_url }})

</td></tr></table>

<table><tr><td>

### [{{ data.newcomers[2].github.name }}]({{ data.newcomers[2].project_url }}) ({{ data.newcomers[2].count }} Contributions)
{{ data.newcomers[2].github.description }}

[![{{ data.newcomers[2].github.name }}](${PROJECT_1_IMAGE})]({{ data.newcomers[2].project_url }})

</td><td>

### [{{ data.newcomers[3].github.name }}]({{ data.newcomers[3].project_url }}) ({{ data.newcomers[3].count }} Contributions)
{{ data.newcomers[3].github.description }}

[![{{ data.newcomers[3].github.name }}](${PROJECT_1_IMAGE})]({{ data.newcomers[3].project_url }})


</td></tr></table>

# <center>Top 10 Contributions</center>
#

1. [${CONTRIBUTION_1_TITLE}](${CONTRIBUTION_1_URL}) (${CONTRIBUTION_1_REWARD} SBD)
by [${CONTRIBUTION_1_USER}](https://utopian.io/@${CONTRIBUTION_1_USER})

2. [${CONTRIBUTION_2_TITLE}](${CONTRIBUTION_2_URL}) (${CONTRIBUTION_2_REWARD} SBD)
by [${CONTRIBUTION_2_USER}](https://utopian.io/@${CONTRIBUTION_2_USER})

3. [${CONTRIBUTION_3_TITLE}](${CONTRIBUTION_3_URL}) (${CONTRIBUTION_3_REWARD} SBD)
by [${CONTRIBUTION_3_USER}](https://utopian.io/@${CONTRIBUTION_3_USER})

4. [${CONTRIBUTION_4_TITLE}](${CONTRIBUTION_4_URL}) (${CONTRIBUTION_4_REWARD} SBD)
by [${CONTRIBUTION_4_USER}](https://utopian.io/@${CONTRIBUTION_4_USER})

5. [${CONTRIBUTION_5_TITLE}](${CONTRIBUTION_5_URL}) (${CONTRIBUTION_5_REWARD} SBD)
by [${CONTRIBUTION_5_USER}](https://utopian.io/@${CONTRIBUTION_5_USER})

6. [${CONTRIBUTION_6_TITLE}](${CONTRIBUTION_6_URL}) (${CONTRIBUTION_6_REWARD} SBD)
by [${CONTRIBUTION_6_USER}](https://utopian.io/@${CONTRIBUTION_6_USER})

7. [${CONTRIBUTION_7_TITLE}](${CONTRIBUTION_7_URL}) (${CONTRIBUTION_7_REWARD} SBD)
by [${CONTRIBUTION_7_USER}](https://utopian.io/@${CONTRIBUTION_7_USER})

8. [${CONTRIBUTION_8_TITLE}](${CONTRIBUTION_8_URL}) (${CONTRIBUTION_8_REWARD} SBD)
by [${CONTRIBUTION_8_USER}](https://utopian.io/@${CONTRIBUTION_8_USER})

9. [${CONTRIBUTION_9_TITLE}](${CONTRIBUTION_9_URL}) (${CONTRIBUTION_9_REWARD} SBD)
by [${CONTRIBUTION_9_USER}](https://utopian.io/@${CONTRIBUTION_9_USER})

10. [${CONTRIBUTION_10_TITLE}](${CONTRIBUTION_10_URL}) (${CONTRIBUTION_10_REWARD} SBD)
by [${CONTRIBUTION_10_USER}](https://utopian.io/@${CONTRIBUTION_10_USER})

<hr />

### A Special Thanks to The Sponsors

{% for moderator in data.moderatos %}
@{{ moderator }}
{% if not loop.last %}, {% endif %}
{% endfor %}

#### A Special Thanks to The Moderators

${MODERATORS}

{% for sponsor in data.sponsors %}
@{{ sponsor }}
{% if not loop.last %}, {% endif %}
{% endfor %}
