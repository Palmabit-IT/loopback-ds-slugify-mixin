loopback-ds-slugify-mixin
=============

# Install

```bash
  npm i @palmabit/loopback-ds-slugify-mixin --save
```

# Server Config

Add the `mixins` property to your `server/model-config.json`:

```json
{
  "_meta": {
    "sources": [
      "loopback/common/models",
      "loopback/server/models",
      "../common/models",
      "./models"
    ],
    "mixins": [
      "loopback/common/mixins",
      "../node_modules/@palmabit/loopback-ds-slugify-mixin",
      "../common/mixins"
    ]
  }
}
```

# Model Config

To use with your Models add the `mixins` attribute to the definition object of your model config.

```json
  {
    "name": "Widget",
    "properties": {
      "name": {
        "type": "string",
      }
    },
    "mixins": {
    "Slugify": {
      "slugifyOptions": { 
        "replacement": "=",
        "remove": null,
        "lower": true,
        "suffixTimestamp": true
      },
      "slugifiedField": "slug",
      "fieldToSlugify": "name"
    }
  }
  }
```

- **slugifyOptions**: Optional. See https://github.com/simov/slugify for more infos
- **slugifiedField**: [String] Optional. Default is "slug". Support dot notation (ex. "foo.bar") for nested
- **fieldToSlugify**: [String] Required. Support dot notation (ex. "foo.bar") for nested
- **suffixTimestamp**: [Boolean] Optional

# Changelog

[Changelog File](CHANGELOG.md)

# License
The MIT License (MIT). Please see [License File](LICENSE) for more information.
