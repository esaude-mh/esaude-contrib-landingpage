<br/><br/><br/>
<img src="https://s3-eu-west-1.amazonaws.com/esaude/images/esaude-site-header.png" alt="eSaude"/>
<br/><br/><br/>

# eSaude Apps Landing Page

This repository contains the code for https://apps.esaude.org.

## Development

### Production Build

You will need NodeJS 4+ installed to do this. See the install instructions [here](https://nodejs.org/en/download/package-manager/).

Once you have NodeJS installed, install the dependencies (first time only):

```sh
npm install
```

Build the distributable using [Webpack](https://webpack.github.io/) as follows:

````sh
npm run build
````

This will created a `dist` directory containing the deployable artifacts.

### Development

To get Webpack to automatically rebuild on code changes, run:

```
npm run watch
```

## Deployment

Deploy the contents of the `dist` directoy your web server. Place a file called
`apps.json` in the same directory as `app.bundle.min.js`. It should look like:

```js
{
  "apps": [
    {
      "id": 1,
      "title": "iBLIS",
      "description": "iLab Africa iBLIS Laboratory Information System",
      "url": "https://iblis.esaude.org/",
      "icon": "img/lab.png",
      "credentials": {
        "username": "administrator",
        "password": "password"
      }
    },
    {
      "id": 2,
      "title": "POC",
      "description": "eSaude EMR Point of Care Application",
      "url": "https://test.esaude.org/home",
      "icon": "img/poc.png",
      "credentials": {
        "username": "admin",
        "password": "Admin123"
      }
    },
    {
      "id": 3,
      "title": "RDE",
      "description": "eSaude EMR Retrospective Data Entry Application",
      "url": "https://test.esaude.org/openmrs",
      "icon": "img/rde.png",
      "credentials": {
        "username": "admin",
        "password": "Admin123"
      }
    }
  ]
}

```

## License

[MPL 2.0 w/ HD](http://openmrs.org/license/)
