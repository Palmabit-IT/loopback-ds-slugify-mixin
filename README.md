Install
=============

```bash
  npm i @palmabit/loopback-ds-slugify-mixin --save
```

SERVER CONFIG
=============

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

MODEL CONFIG
=============

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
        "lower": true
      },
      "slugifiedField": "slug", // Optional. By default is "slug"
      "fieldToSlugify": "name" // Required
    }
  }
  }
```

- **slugifyOptions**: Optional. See https://github.com/simov/slugify for more infos
- **slugifiedField**: [String] Optional. Default is "slug". In dot notation
- **fieldToSlugify**: [String] Required. In dot notation.

The MIT License (MIT). Please see [License File](LICENSE) for more information.
