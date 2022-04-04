import React, { Component } from "react";
//import OnboardingNavBar from "../components/navbar_onboarding";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import bcrypt from "bcryptjs";
import Select from "react-select";

import { useRef, useState, useEffect } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { signup } from "../modules/firebase";
import Head from "next/head";

export default function Signup() {
  // Firebase
  const [loading, setLoading] = useState(false);

  const { control, register, handleSubmit } = useForm();
  const occupation = 1;
  const [occupation_id, setOccupation_id] = useState(0);

  const [email, setEmail] = useState(" ");

  const handleInput = (event) => {
    setEmail(event.target.value);
  };

  async function handleSignup(data) {
    setLoading(true);
    // try {
    await signup(data);
    // } catch {
    // alert("Error!");
    // }
    setLoading(false);

    console.log("Signup Successful");
  }

  const setOccupation = (value) => {
    occupation = value;
    setOccupation_id(value);
  };
  const upload = (data) => {
    const options = [
      { label: "Caloocan", id: "caloocan" },
      { label: "Malabon", id: "malabon" },
      { label: "Navotas", id: "navotas" },
      { label: "Valenzuela", id: "valenzuela" },
     
    ];
    data["occupation_id"] = options[occupation_id - 1].id;
    data["occupation"] = options[occupation_id - 1].label;
    console.log(data);
    handleSignup(data);
  };
  const options = [
    { value: "1", label: "Caloocan", id: "caloocan" },
    { value: "2", label: "Malabon", id: "malabon" },
    { value: "3", label: "Navotas", id: "navotas" },
    { value: "4", label: "Valenzuela", id: "valenzuela" },
  ];
  return (
    <div className="h-screen">
      <Head>
        <title>Sign Up | ANPANMONEY</title>
      </Head>
        <div className="row-span-1 lg:col-span-1 grow-0 p-5">
          <div className="p-6 shadow-lg rounded-lg bg-white">
            <form
              className="space-y-4"
              onSubmit={handleSubmit((data) => upload(data))}
            >
              <div className="grid grid-cols-2 space-x-4">
                <div className="col-span-1 space-y-2">
                  <label>First Name</label>
                  <input
                    className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fname"
                    type="first_name"
                    placeholder="John"
                    {...register("fname", { required: true })}
                  ></input>
                </div>
                <div className="col-span-1 space-y-2">
                  <label>Last Name</label>
                  <input
                    className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lname"
                    type="last_name"
                    placeholder="Doe"
                    {...register("lname", { required: true })}
                  ></input>
                </div>
              </div>{" "}
              {/* name div */}
              <div>
                <div>
                  <div className="space-y-2">
                    <label>Email</label>
                    <input
                      className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="johndoe@anpanmoney.ph"
                      {...register("email", { required: true })}
                    ></input>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-2">
                  <label>Password</label>
                  <input
                    className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  ></input>
                </div>
              </div>
              <div>
                <div className="space-y-2">
                  <label>
                    Occupation
                    <br />
                  </label>
                  <div>
                    <Controller
                      control={control}
                      defaultValue={0}
                      name="occupation_id"
                      render={({ onChange, value, name, ref }) => (
                        <Select
                          inputRef={ref}
                          classNamePrefix="addl-class"
                          options={options}
                          value={options.find((c) => c.value === value)}
                          onChange={(val) => setOccupation(val.value)}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  class="shadow bg-blue-400 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-500 text-center">
                  Already have an account?{" "}
                  <a href="./login" className="hover:text-black">
                    Login instead.
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
