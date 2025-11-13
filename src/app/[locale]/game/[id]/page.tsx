import React from "react";

async function GameDetailsPage({ params }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>Game Details: {id}</div>;
}

export default GameDetailsPage;
