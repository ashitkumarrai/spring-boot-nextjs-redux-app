import React from "react";
import Headd from "next/head";

function Head({ children }) {
    return (
        <Headd>
            <title>AI Pedia</title>
            <meta name="description" content="AI Pedia" />
            <link rel="icon" href="/favicon.ico" />
        </Headd>
    );
}

export default Head;
