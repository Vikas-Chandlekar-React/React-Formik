import { useFormik } from "formik";
import React from "react";

function YoutubeForm() {
  const formik = useFormik({});
  console.log(`🚀 ~ file: YoutubeForm.jsx:6 ~ YoutubeForm ~ formik:`, formik);

  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" name="channel" />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default YoutubeForm;
