/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.supersconto24.com', 'localhost',
          "target.scene7.com",
          "m.media-amazon.com",
          "i5.walmartimages.com",
          "sangabrielcomidas.com",
          "spoonfulapp.com",
          "klbtheme.com",
          "ongolemart.com",
          "supersconto-images-bucket.s3.eu-west-3.amazonaws.com",
        ]
        // domains: ['http://localhost:3000/','localhost']
      },
      publicRuntimeConfig: {
        APP_NAME: "supersconto",
        APP_LOGO_URL: "",
      },
    output: 'standalone'
}

module.exports = nextConfig
