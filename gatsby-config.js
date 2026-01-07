require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `NanSystems - Ana Echeverría`,
    description: `Ana Echeverria provides solutions in IT and technology for the medium, small and large companies.`,
    author: `Saturno Mangieri -> saturnoman.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `NaNSYSTEMS.us`,
        short_name: `NaNSYSTEMS.us`,
        start_url: `/`,
        background_color: `#285790`,
        theme_color: `#285790`,
        display: `standalone`,
        icon: `src/media-imgs/favIcon.png`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: `${process.env.api_key}`,
      },
    },
    //animations for ventures page
    {
      resolve: `gatsby-plugin-scroll-reveal`,
      options: {
          threshold: 0.5, // Percentage of an element's area that needs to be visible to launch animation
          // once: true, // Defines if animation needs to be launched once
          // disable: false, // Flag for disabling animations
          
          // Advanced Options
          // selector: '[data-sal]', // Selector of the elements to be animated
          // animateClassName: 'sal-animate', // Class name which triggers animation
          // disabledClassName: 'sal-disabled', // Class name which defines the disabled state
          // rootMargin: '0% 50%', // Corresponds to root's bounding box margin
          // enterEventName: 'sal:in', // Enter event name
          // exitEventName: 'sal:out', // Exit event name
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        // googleAnalytics: {
        //   trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID',
        //   // Setting this parameter is optional
        //   anonymize: true
        // },     >>>>>>> todo LATER dont forget configure the google analytics using nansystems.us@gmail.com <<<<<<<<
        // Defines the environments where the tracking should be available  - default is ["production"]
        environments: ['production', 'development']
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-GWX08J3QRF", // Google Analytics / GA
        ],
      },
    },
  ],
}
