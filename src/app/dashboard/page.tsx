import HomePage from "Q/components/pages/home";
import { supabase } from "Q/lib/supabase";

function Page() {
  const setData = async () => {
    let { data: task_status } = await supabase.from("task_status").select("*");

    console.log("task_status", task_status);
    if (task_status) {
      console.log("data12", task_status);
    }
  };

  setData();
  return <HomePage />;
}

export default Page;
