# kosmtik-overlay

Add an overlay in Kosmtik

## Install

In Kosmtik root folder, type:

`node index.js plugins --install kosmtik-overlay`

## Config

You can add an `overlay` key to your `project.mml` or your kosmtik `config.yml`
files to override the behaviour. For example:

```yml
overlay:
    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    active: true
    opacity: 1
    position: -1

```

## Issues and feature requests

Please report any issue or feature request on the [main kosmtik repository](https://github.com/kosmtik/kosmtik/issues).
