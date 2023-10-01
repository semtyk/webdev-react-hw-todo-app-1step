const token = "bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";

// а.1 реализуем запрос в АПИ на получение списка задач
export async function getTodos() {
  const response = await fetch("https://wedev-api.sky.pro/api/v2/todos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Ошибка загрузки данных с сервера");
  }
  const data = await response.json();
  return data;
}

// б.1 реализуем запрос в апи на добавление задачи

export async function postTodos(text) {
  const response = await fetch("https://wedev-api.sky.pro/api/v2/todos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error("Ошибка при добавлении данных на сервер");
  }
  const data = await response.json();
  return data;
}

// в.1 реализуем запрос в апи на удаление задачи

export async function delTodos(id) {
  const response = await fetch("https://wedev-api.sky.pro/api/v2/todos/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }
  const data = await response.json();
  return data;
}
