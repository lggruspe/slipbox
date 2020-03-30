from datetime import datetime
import os.path
import random
import sys
import uuid

template = """
---
title: {}
author: Levi Gruspe
date: {}
keywords: |
    #test
...

[Lorem ipsum]({}) dolor sit amet, consectetur adipiscing elit. Morbi faucibus risus non volutpat viverra. Ut in iaculis erat. Curabitur non nibh tortor. Vivamus fermentum sem varius, aliquet nibh ac, congue orci. Praesent porttitor aliquet lorem, nec ultricies lectus auctor sed. Vestibulum in orci pellentesque, rutrum magna a, tincidunt purus. Vivamus eget elementum ligula. Donec quis lacus eu eros ultricies pulvinar eget ac lectus. Donec ut dignissim elit. Donec ac elementum dolor, non accumsan justo.

[Vivamus]({}) condimentum ligula quis lacus laoreet, vitae hendrerit tortor pulvinar. Nunc feugiat lectus vel varius eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec lectus nunc, lacinia id risus eu, gravida euismod lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam sapien nibh, varius ac massa pellentesque, viverra ultrices libero. Pellentesque tempus bibendum dui quis venenatis. Donec sagittis rhoncus massa, eu laoreet eros luctus et. Proin placerat, neque in ullamcorper congue, nulla nulla ullamcorper tellus, eleifend finibus justo lacus ut massa. Praesent et lacus massa. Aliquam id finibus libero, at iaculis ligula. Etiam faucibus justo a libero venenatis cursus. Curabitur risus nunc, euismod at aliquet vitae, congue facilisis elit. Etiam vitae iaculis lectus. Pellentesque vitae mauris ut nibh consectetur tempus.

[Vestibulum]({}) pellentesque mi id ex consequat, a mollis nisi egestas. Praesent pharetra turpis velit, et ultrices sapien malesuada a. Sed a ipsum turpis. Nulla ultrices, neque ut ullamcorper consequat, quam nunc tincidunt sapien, quis pulvinar risus erat at libero. Curabitur ultricies est eget scelerisque tempor. Proin placerat ligula nec urna auctor, quis pharetra arcu commodo. Duis viverra magna vel mauris tempus ornare. Quisque molestie velit eu erat commodo, placerat pharetra neque accumsan. Nunc mollis odio nunc, et euismod mi lacinia sit amet. Suspendisse id turpis velit. Duis tempus dapibus ligula, vel laoreet turpis cursus iaculis. Duis convallis, magna eget pretium ornare, ipsum magna aliquet magna, at semper tortor ex vel magna.

[Proin]({}) ante libero, fermentum in massa vitae, efficitur molestie metus. Sed in pretium sapien, non mollis velit. In hac habitasse platea dictumst. Quisque massa nunc, mollis eget nisi id, porta pellentesque neque. Nulla tempor libero at convallis placerat. Cras lacinia sit amet lorem quis sodales. Vestibulum sed turpis ut turpis ultricies vestibulum.

[Ut ante dolor]({}), bibendum non gravida in, sollicitudin sit amet arcu. Nam ornare tempor vulputate. Nulla et ullamcorper magna. Maecenas dictum tortor id volutpat interdum. Quisque pretium ligula dictum vehicula viverra. Aenean in tellus orci. Fusce aliquam felis nec finibus pellentesque. Vivamus leo ex, semper nec mi in, posuere auctor dui.
"""

try:
    n = int(sys.argv[1])
except:
    n = 100
notes = {}
for i in range(n):
    links = []
    for i in range(5):
        try:
            link = random.choice(list(notes.keys()))
            if link in links:
                link = ""
            links.append(link)
        except:
            links.append("")

    key = uuid.uuid4().hex
    notes[f"{key}.md"] = template.format(key, datetime.now().strftime("%Y-%m-%d %H:%M:%S"), *links)

for filename, body in notes.items():
    path = os.path.join(os.path.dirname(__file__), filename)
    with open(path, "w") as f:
        print(body, file=f)
