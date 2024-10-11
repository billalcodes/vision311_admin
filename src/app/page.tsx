
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Admin from "@/components/Dashboard/Admin";

export const metadata: Metadata = {
  title:
    "Admin Portal",
  description: "Vision 311 admin portalsrc/app/",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Admin />
      </DefaultLayout>
    </>
  );
}
