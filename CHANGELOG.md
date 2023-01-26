# Changelog

## [v0.19.13] - 2023-01-23

- Fix how author names are displayed in the bibliography section
    + Sometimes names would show up as dashes.
- Allow passing CSL file to `pandoc` via the config file to style the bibliography section

## [v0.19.12] - 2022-12-09

- Add support for Python 3.11
    +   Note: older versions of `slipbox` probably have support for Python 3.11,
        but it wasn't tested until this release.

## 2022-10-10

### [v0.19.11]

- Fix how `all` checker gets resolved

### [v0.19.10]

- Fix notes checker

### [v0.19.9]

- Add `[check]` section to config file for enabling and disabling checkers
- Add checker for graph cycles
- Add checker for links with empty targets
- Add `all` alias to activate all checkers
- Add `--strict` flag to turn warnings into errors
- Output build messages in `stdout` instead of `stderr`

## [v0.19.8] - 2022-10-08

- Show IDs of invalid links in error messages
- Add colors to output
- Update warning and error messages

## [v0.19.7] - 2022-10-03

- Update error messages

## [v0.19.6] - 2022-10-02

<!--TODO-->
