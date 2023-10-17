export function getApplicationStatuses(code: string) {
  const statusesMap: any = {
    success: {
      status: "success",
      textOfStatus: "Загружена кандидатом",
    },
    idle: {
      status: "idle",
      textOfStatus: "Ожидают загрузки",
    },
    active: {
      status: "active",
      textOfStatus: "Активна",
    },
    inactive: {
      status: "inactive",
      textOfStatus: "Не активна",
    },
  };

  return statusesMap[code.toLowerCase()];
}
