import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";

const Home: NextPage = () => {
  interface DataType {
    occupations: string[];
    states: { name: string; abbreviation: string }[];
  }

  interface FormDataType {
    name: string;
    email: string;
    password: string;
    occupation: string;
    state: string;
  }

  const [occupations, setOccupations] = useState<string[]>([]);
  const [states, setStates] = useState<
    { name: string; abbreviation: string }[]
  >([]);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    password: "",
    occupation: "",
    state: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  async function sendUserData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user: FormDataType = await fetch(
      "https://frontend-take-home.fetchrewards.com/form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((resp) => resp.json())
      .catch((err) => console.error(err));
    setFormData({
      name: "",
      email: "",
      password: "",
      occupation: "",
      state: "",
    });
    alert(`   User submitted successfully!\n
    name: ${user.name}
    email: ${user.email}
    password: ${user.password}
    occupation: ${user.occupation}
    state: ${user.state}`);
  }

  useEffect(() => {
    async function getData() {
      const data: DataType = await fetch(
        "https://frontend-take-home.fetchrewards.com/form"
      ).then((resp) => resp.json());
      setOccupations(data.occupations);
      setStates(data.states);
    }
    getData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#4568dc] to-[#b06ab3]">
      <Head>
        <title>User Creation Form</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form
        onSubmit={sendUserData}
        className=" flex flex-col items-center w-max h-max max-w-md min-w-max  rounded-md shadow-2xl bg-white"
      >
        <h1 className="flex justify-center mt-4 mb-4 font-bold text-2xl">
          User Creation Form
        </h1>
        <div className="px-8 pb-8 min-w-[300px]">
          <div className="flex mt-4">
            <label htmlFor="name" hidden>
              Full Name
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              type="text"
              value={formData.name}
              id="name"
              placeholder="Full Name"
              className="input-text"
              required
            />
          </div>
          <div className="mt-4 ">
            <label htmlFor="email" hidden>
              Email
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="text"
              value={formData.email}
              id="email"
              placeholder="Email"
              className="input-text"
              required
            />
          </div>
          <div className="mt-4 ">
            <label htmlFor="password" hidden>
              Password
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type={showPassword ? "text" : "password"}
              value={formData.password}
              id="password"
              placeholder="Password"
              className="input-text"
              required
            />
          </div>
          <input
            type="checkbox"
            id="showPassword"
            onChange={(e) => setShowPassword(e.target.checked)}
            className="mt-2 w-5 h-5 align-text-bottom "
          />
          <label htmlFor="showPassword" className="ml-2">
            Show Password
          </label>

          <div className="mt-4 ">
            <label htmlFor="occupation" hidden>
              Occupation
            </label>
            <select
              onChange={(e) =>
                setFormData({ ...formData, occupation: e.target.value })
              }
              name="occupation"
              id="occupation"
              value={formData.occupation}
              className="select-style"
              required
            >
              <option hidden value={""}>
                Select occupation
              </option>
              {occupations?.map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 ">
            <label htmlFor="state" hidden>
              State
            </label>
            <select
              onChange={(e) => 
                setFormData({ ...formData, state: e.target.value })
              }
              name="state"
              id="state"
              value={formData.state}
              className="select-style"
              required
            >
              <option hidden value={""}>
                Select state
              </option>
              {states?.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.abbreviation}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-8 py-1 font-semibold text-white bg-[#5865F2] hover:bg-[#4752C4] transition duration-200 rounded-full w-full "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
