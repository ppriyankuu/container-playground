export interface Container {
  containerId: string;
  internalPort: number;
  externalPort: number;
}

export async function fetchNewContainer({imgName}: {imgName: string}): Promise<Container> {
  // const image = "ubuntu-vscode";

  try {
    const response = await fetch("http://localhost:4000/api/v1/new-container", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imgName,
        cmd: "",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch new container");
    }
    const data: Container = await response.json();
    // console.log("Container Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching new container:", error);
    return {
      containerId: "",
      internalPort: 0,
      externalPort: 0,
    };
  }
}
