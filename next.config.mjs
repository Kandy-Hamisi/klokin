/** @type {import('next').NextConfig} */

import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
    swSrc: "app/sw.js",
    swDest: "public/sw.js"
})


export default withSerwist({
    // Next js configuration
});
