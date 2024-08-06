import React, { useEffect, useRef } from "react";
import { Terminal as XTerminal } from "xterm";
import "xterm/css/xterm.css";

export default function Terminal({
  terminalRef,
  containerId,
}: {
  terminalRef: React.RefObject<HTMLDivElement>;
  containerId: string | null;
}) {
  const termRef = useRef<XTerminal | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (containerId && terminalRef.current) {
      const term = new XTerminal({
        cursorBlink: true,
        fontSize: 16,
        rows: 20,
        cols: 90,
      });

      term.open(terminalRef.current);
      termRef.current = term;

      const ws = new WebSocket("ws://localhost:4000"); // Update this to your WebSocket server URL
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connection opened.");
        ws.send(JSON.stringify({ event: "containerId", data: containerId }));
      };

      ws.onclose = (event) => {
        console.log("WebSocket connection closed. Code:", event.code, "Reason:", event.reason);
        term.dispose();
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        term.dispose();
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.event === "output") {
            term.write(message.data);
          }
        } catch (e) {
          console.error("Error parsing message:", e);
        }
      };

      term.onData((data) => {
        if (wsRef.current) {
          wsRef.current.send(JSON.stringify({ event: "input", data }));
        }
      });

      return () => {
        term.dispose();
        ws.close();
      };
    }
  }, [containerId]);

  return (
    <div
      ref={terminalRef}
      className="bg-black rounded-lg shadow-lg border-2 border-blue-400 overflow-hidden w-full h-100"
      style={{ width: "100%", height: "400px" }} // Adjust the height as needed
    />
  );
}
