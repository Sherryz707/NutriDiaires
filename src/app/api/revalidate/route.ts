
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";


export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<any>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    if (!body?._type) {
      const message = "Bad Request";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }
    if (body?._type === "settings") {
      revalidateTag(body._type)
      console.log(`Revalidated ${body._type}`)
      const message = `Updated route: ${body?._type}`;
      return NextResponse.json({ body, message });
    }
    if (body?._type === "post" ) {
      revalidatePath("/");
     
      if (body?.categories && body?.categories.length > 0) {
         body?.categories.map((category:any) => {
           revalidatePath(`/${category._type}/${category.slug.current}`)
           console.log("revalidate categ",`/${category._type}/${category.slug.current}`)
         })
       }
    }
      revalidatePath(`/${body?._type}/${body?.slug.current}`)
    const message = `Updated route for: ${body} $/${body?._type}/${body?.slug.current}`;
    console.log(message,"in revalidate")
    return NextResponse.json({ body, message });
  } catch (err:any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}
