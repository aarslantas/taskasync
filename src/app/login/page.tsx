// "use client";

// import { supabase } from "Q/lib/supabase";

// function LoginPage() {
//   const login = async () => {
//     try {
//       let { data, error } = await supabase.auth.signUp({
//         email: "someone@email.com  ",
//         password: "id123456789ID",
//       });

//       if (data) {
//         console.log(data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center justify-center flex-1 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <div>
//             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//               Giriş Yap
//             </h2>
//           </div>
//           <form className="mt-8 space-y-6" action="#" method="POST">
//             {/* <input type="hidden" name="remember" value="true" />
//             <div className="rounded-md shadow-sm -space-y-px">
//               <div>
//                 <label htmlFor="email-address" className="sr-only">
//                   Email Adresi
//                 </label>
//                 <input
//                   id="email-address"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Email Adresi"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="sr-only">
//                   Şifre
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Şifre"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember_me"
//                   name="remember_me"
//                   type="checkbox"
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="remember_me"
//                   className="ml-2 block text-sm text-gray-900"
//                 >
//                   Beni Hatırla
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <a
//                   href="#"
//                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   Şifremi Unuttum
//                 </a>
//               </div>
//             </div> */}
//             <div>
//               <button
//                 className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 onClick={login}
//               >
//                 <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                   <svg
//                     className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       fill-rule="evenodd"
//                       d="M10 12a2 2 0 100-4 2 2 0 000 4z"
//                     />
//                     <path
//                       fill-rule="evenodd"
//                       d="M4 8V7a4 4 0 014-4h4a4 4 0 014 4v1h1a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1v-7a1 1 0 011-1h1zm6-5a2 2 0 00-2 2v1h4V5a2 2 0 00-2-2h-1zm-2 7v5h4v-5h-4z"
//                       clip-rule="evenodd"
//                     />
//                   </svg>
//                 </span>
//                 Sign up
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LoginPage;,

"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        style={{ backgroundColor: "orange" }}
      />
      <input
        type="password"
        name="password"
        style={{ backgroundColor: "green" }}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
}
