import React, { useEffect } from "react";
import { useRef, useState } from "react";
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from "uuid";

import {
  getPasswords,
  savePasswordToDB,
  deletePasswordFromDB,
} from "../api";




const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  // const getPasswords = async () => {
  //   let req = await fetch("http://localhost:3000/api/passwords");
  //   let passwords = await req.json();
  //   console.log(passwords);
  //   setPasswordArray(passwords);
  // };

  // useEffect(() => {
  //   getPasswords();
  // }, []);

  useEffect(() => {
  async function fetchData() {
    const passwords = await getPasswords();
    setPasswordArray(passwords);
  }
  fetchData();
}, []);

  const copyText = (text) => {
    toast.success("Copied to Clipboard")
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (ref.current.src.includes("eyecross.png")) {
      ref.current.src = "eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  // const savePassword = async () => {
  //   if (
  //     form.site.length > 3 &&
  //     form.username.length > 3 &&
  //     form.password.length > 3
  //   ) {
  //     let updatedForm = { ...form };
  //     // Check if it's a new entry
  //     if (!form.id) {
  //       updatedForm.id = uuidv4(); // Assign a new ID
  //     } else {
  //       // Delete the old entry from backend if editing
  //       await fetch("/api/passwords", {
  //         method: "DELETE",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ id: form.id }),
  //       });
  //     }
  //     await fetch("/api/passwords", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedForm),
  //     });
  //     setPasswordArray([...passwordArray, updatedForm]);
  //     setForm({ site: "", username: "", password: "" });
  //     toast.success("Password saved...")
  //   } else {
  //     toast.error("Password not saved!");
  //   }
  // };

  const savePassword = async () => {
  if (
    form.site.length > 3 &&
    form.username.length > 3 &&
    form.password.length > 3
  ) {
    let updatedForm = { ...form };
    if (!form.id) {
      updatedForm.id = uuidv4();
    } else {
      await deletePasswordFromDB({ id: form.id });
    }

    await savePasswordToDB(updatedForm);
    setPasswordArray([...passwordArray, updatedForm]);
    setForm({ site: "", username: "", password: "" });
    toast.success("Password saved...");
  } else {
    toast.error("Password not saved!");
  }
};

  const editPassword = (id) => {
    setForm({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  // const deletePassword = async (id) => {
  //   let c = confirm("Do you really want to delete this password?");
  //   if (c) {
  //     setPasswordArray(passwordArray.filter((item) => item.id !== id));
  //     let res = await fetch("/api/passwords", {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ id }),
  //     });
  //     toast.success("Password deleted!");
  //   }
  // };

  const deletePassword = async (id) => {
  const c = confirm("Do you really want to delete this password?");
  if (c) {
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    await deletePasswordFromDB({ id });
    toast.success("Password deleted!");
  }
};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="px-4 sm:px-6 md:px-10 lg:px-40 md:mycontainer min-h-[84.5vh]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-center pt-5">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-950 text-center text-base sm:text-lg font-bold">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-6 sm:gap-8 items-center max-w-3xl mx-auto">
          <input
            placeholder="Enter website URL"
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-green-500 w-full p-2 bg-white"
            type="text"
            name="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-4 sm:gap-8 items-center">
            <input
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-green-500 w-full p-2 bg-white"
              type="text"
              name="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-500 w-full p-2 bg-white"
                type="password"
                name="password"
              />
              <span
                className="absolute right-2 top-1.5 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={28}
                  src="/eye.png"
                  alt="show"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-500 rounded-full px-6 py-2 w-fit font-semibold hover:bg-green-600 cursor-pointer border"
          >
            <lord-icon
              src="https://cdn.lordicon.com/gzqofmcx.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords max-w-6xl mx-auto overflow-x-auto">
          <h2 className="font-bold text-xl sm:text-2xl py-4 text-center md:text-left">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-center"> No Passwords to show </div>
          )}
          {passwordArray.length != 0 && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2 px-2">Site</th>
                    <th className="py-2 px-2">Username</th>
                    <th className="py-2 px-2">Password</th>
                    <th className="py-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-200">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center py-2 border border-white">
                          <div className="flex items-center justify-center gap-2">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="lordiconcopy cursor-pointer"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/jqqjtvlf.json"
                                trigger="hover"
                                colors="primary:#242424"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>

                        <td className="text-center py-2 border border-white">
                          <div className="flex items-center justify-center gap-2">
                            <span>{item.username}</span>
                            <div
                              className="lordiconcopy cursor-pointer"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/jqqjtvlf.json"
                                trigger="hover"
                                colors="primary:#242424"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>

                        <td className="text-center py-2 border border-white">
                          <div className="flex items-center justify-center gap-2">
                            <span>{"*".repeat(item.password.length)}</span>
                            <div
                              className="lordiconcopy cursor-pointer"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/jqqjtvlf.json"
                                trigger="hover"
                                colors="primary:#242424"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>

                        <td className="text-center py-2 border border-white">
                          <div className="flex justify-center gap-2">
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                editPassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/exymduqj.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#121331,secondary:#242424"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                deletePassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#121331,secondary:#242424"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
