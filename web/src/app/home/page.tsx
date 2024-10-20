"use client";

import { containerState, imageAtom } from "@/atom/container";
import { LaunchCard } from "@/components/launch-card";
import { fetchNewContainer } from "@/lib/containerFetch";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

export default function Page() {
  const setContainer = useSetRecoilState(containerState);
  const setImage = useSetRecoilState(imageAtom);
  const router = useRouter();

  const startNewContainer = async ({imgName}: {imgName: string}) => {
    // console.log("Starting New Container");
    // console.log("imgName:", imgName);

    if(imgName === 'mongo-terminal') setImage('mongo')

    if(imgName === 'postgres-terminal') setImage('postgres');

    const containerData = await fetchNewContainer({imgName});
    setContainer(containerData);
    console.log("Container:", containerData);

    const containerId = containerData.containerId;

    router.push(`/playground?containerId=${containerId}`);
  };

  //   return (
  //     <div>
  //       <div className="p-9 mx-auto">
  //         <button
  //           className="p-2 rounded-md bg-slate-500"
  //           onClick={startNewContainer}
  //         >
  //           Start New Container
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="w-full h-full p-10">
        <div className="grid grid-cols-4">
          <LaunchCard
            imgName="ubuntu-vscode"
            startNewContainer={startNewContainer}
            image="https://imageio.forbes.com/blogs-images/jasonevangelho/files/2018/07/ubuntu-logo.jpg?format=jpg&height=900&width=1600&fit=bounds"
            title="Ubuntu 24.0"
            description="An ubuntu Image"
          />
          
          <LaunchCard
            imgName="mongo-terminal"
            startNewContainer={startNewContainer}
            image="https://imgs.search.brave.com/aZhmWgXhRE0fudcEtDTtS6J0AvMqg5wkaOKa_djhSO0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL21vbmdv/ZGI5NzQwLmxvZ293/aWsuY29tLndlYnA"
            title="MongoDB"
            description="A mongo container"
          />
          
          <LaunchCard
            imgName="postgres-terminal"
            startNewContainer={startNewContainer}
            image="https://imgs.search.brave.com/Cds-plx6y5rdjd3WIas52hpcUl0Gtj7j6x5Vs9PEceQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL3Bvc3Rn/cmVzcWw2ODE1Lmpw/Zw"
            title="PostgreSQL"
            description="A postgres container"
          />
        </div>
      </div>
    </>
  );
}
