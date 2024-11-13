export function extractFileName(url) {
    // Verifica se a URL é uma string e se contém barras para fazer o split
    if (typeof url === "string" && url.includes("/")) {
      // Divide a URL usando a última barra e retorna o último elemento
      return url.split("/").pop();
    }
    // Retorna uma string vazia se a URL for inválida
    return "";
  }