import { Post, PostList } from "@/app/types/Post";
import { getApiEndpoint } from "@/app/utils/getApiEndPoint";

const makeRequestBody = (cateType: string, email: string, form: Post) => {
  const base = {
    email,
    title: form.title,
    contents: form.contents,
    firstDate: form.firstDate.toISOString(),
    lastDate: form.lastDate.toISOString(),
  };

  if (cateType.includes("photoshop")) {
    return {
      ...base,
      category:
        typeof form.category === "string" ? form.category : form.category[0],
      price: form.price,
    };
  }
  if (cateType.includes("free")) {
    return { ...base, place: form.place };
  }
  if (cateType.includes("model") || cateType.includes("photographer")) {
    return {
      ...base,
      category: Array.isArray(form.category) ? form.category : [form.category],
      price: form.price,
      place: form.place,
    };
  }
  throw new Error("유효하지 않은 게시판 경로입니다.");
};

export const postService = {
  create: async (form: Post) => {
    const requestBody = makeRequestBody(cateType, email, form);
    const formData = new FormData();

    formData.append(
      "RequestBody",
      new Blob([JSON.stringify(requestBody)], {
        type: "application/json",
      })
    );
    if (Details?.length > 0) {
      Details.forEach((file) => formData.append("Details", file));
    }

    if (Title) {
      formData.append("Title", Title);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${getApiEndpoint(cateType)}`,
        {
          method: "POST",
          headers: { Token: token },
          body: formData,
        }
      );
      if (!res.ok) {
        const errData = await res.text();
        console.error("❌ 서버 응답 에러", res.status, errData);

        throw new Error(`게시글 등록 실패ㅠ: ${res.status} ${errData}`);
      }

      const result = await res.json();
      console.log("성공 :", result);
      alert("업로드 성공 !");
    } catch (error) {
      console.error("실패 :", error);
      alert("업로드 실패 (콘솔 확인)");
    }
  },

  read: async (pathname: string): Promise<PostList[]> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${getApiEndpoint(pathname)}`,
      { method: "GET" }
    );
    if (!res.ok) {
      throw new Error("게시글 목록 조회에 실패했습니다.");
    }
    return res.json();
  },

  update: async (
    form: Post,
    Title: File,
    Details: File[],
    pathname: string,
    email: string,
    token: string
  ) => {
    const requestBody = {
      id: form.bid,
      ...makeRequestBody(pathname, email, form),
    };

    const formData = new FormData();
    formData.append(
      "RequestBody",
      new Blob([JSON.stringify(requestBody)], {
        type: "application/json",
      })
    );
    formData.append("Title", Title);
    Details.forEach((file) => formData.append("Details", file));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${getApiEndpoint(pathname)}`,
      {
        method: "PUT",
        headers: { Token: token },
        body: formData,
      }
    );

    if (!res.ok) throw new Error("게시글 수정 실패 ㅠ");
    return res.json();
  },

  delete: async (
    boardType: string,
    id: number,
    email: string,
    token: string
  ) => {
    const endpoint = getApiEndpoint(boardType);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        Token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, email }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "게시글 삭제 실패ㅠ");
    }

    return res.json();
  },

  detail: async (postId: number, email: string, cateType: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${getApiEndpoint(cateType)}/detail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: postId, email }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("❌ 상세 조회 에러", res.status, err);
      throw new Error(`게시글 상세 조회 실퓨ㅐ: ${res.status}${err}`);
    }
    return res.json();
  },
  getPickPosts: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pick`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Pick 게시물 가져오기 실패");
    }

    return res.json();
  },
};
