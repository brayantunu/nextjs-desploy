'use client'
// pages/create-note.js

import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import CreateNoteForm from "@/components/CreateNoteForm";

export default function CreateNotePage() {
  return (
    <main className="h-full fixed w-full">
      <Card className="flex max-w-[400px] mx-auto my-96">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">Add New Notes</p>
            <p className="text-small text-default-500">Plan your studies</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <CreateNoteForm />
        </CardBody>
        <Divider />
      </Card>
    </main>
  );
}
