"use client"
import generateCatName from "@/lib/catName";
import MaterialSymbolsFlag from "@/components/MaterialSymbolsFlag";
import {useRef, useState} from "react";
import {reportPost} from "@/app/actions";

export default function Post({
                text,
                hashtags,
                id,
              }: {
  text: string;
  hashtags: { values: string[] };
  id: number;
}) {
  const name = generateCatName(text);
  const dialogRef = useRef<HTMLDialogElement>(null);



  return (
      <div className="rounded-lg overflow-hidden bg-white border border-gray-200 flex items-start p-4 gap-4">
        <img
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${name}`}
            width={50}
            height={50}
            alt=""
            className="rounded-full overflow-hidden"
        />
        <div>
          <div>
            <div className="font-bold text-xl mb-2">{generateCatName(text)}</div>
            <p className="text-gray-700 text-base">{text}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            {hashtags.values.map((hashtag) => (
                <span
                    key={hashtag}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
              #{hashtag}
            </span>
            ))}
          </div>
          <button className="flex items-center gap-2 border-2 border-red-500 rounded-xl p-2 text-red-500" onClick={() => dialogRef.current!.showModal()}>
            <MaterialSymbolsFlag className="h-4"></MaterialSymbolsFlag>
            Signaler
          </button>
          <dialog ref={dialogRef} className="border-2 border-gray-300 p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4 flex gap-2 items-center"><MaterialSymbolsFlag className="h-4"></MaterialSymbolsFlag> Signaler un post</h2>
            <form action={async (f) => {
              await reportPost(f)
              dialogRef.current!.close()
            }} className="flex flex-col gap-2">
              <input className="hidden" type="hidden" name="id" value={id}></input>
              <select name="reason" required className="p-2 rounded-xl border-blue-500 border-2" id="reason">
                <option selected disabled value="">Sélectionnez une raison</option>
                <option value="Dangereux ou illégal">Dangereux ou illégal</option>
                <option value="Discrimination">Discrimination</option>
                <option value="Désinformation">Désinformation</option>
                <option value="Pas respectueux">Pas respectueux</option>
              </select>
              <button type="submit" className="bg-red-500 text-white p-2 rounded-xl font-bold">Signaler</button>
              <button type="reset" onClick={() => dialogRef.current!.close()} className="font-bold">Annuler</button>
            </form>
          </dialog>
        </div>
      </div>
  );
}
