import React, { useState, useEffect } from "react";
import AdSense from "react-adsense";

export default function BannerPanel({ slot, inset }) {
  if (inset) {
    return (
      <AdSense.Google
        client="ca-pub-2681240380511410"
        slot={slot}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
        layout="in-article"
        format=""
      />
    );
  }
  return (
    <AdSense.Google
      client="ca-pub-2681240380511410"
      slot={slot}
      style={{
        display: "block",
      }}
      //layout="in-article"
      format="auto"
      responsive="true"
    />
  );
}
