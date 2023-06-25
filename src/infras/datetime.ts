function formatFriendlyDatetime(datetime: Date): string
{
   const currentTime = new Date();
   const targetTime = new Date(datetime);

   const timeDifference = targetTime.getTime() - currentTime.getTime();
   const seconds = Math.floor(timeDifference / 1000);
   const secondsAbs = Math.abs(seconds)

   // too lazy to break them in separate function
   if (secondsAbs < 60) {
      return `${secondsAbs} seconds ${seconds < 0 ? "ago" : "from now"}`;
   } else if (secondsAbs < 3600) {
      const minutes = Math.floor(secondsAbs / 60);
      return `${minutes} minutes ${seconds < 0 ? "ago" : "from now"}`;
   } else if (secondsAbs < 86400) {
      const hours = Math.floor(secondsAbs / 3600);
      return `${hours} hours ${seconds < 0 ? "ago" : "from now"}`;
   } else {
      const days = Math.floor(secondsAbs / 86400);
      return `${days} days ${seconds < 0 ? "ago" : "from now"}`;
   }
}

function formatDateExpire(datetime: Date): string
{
   const currentTime = new Date();
   const targetTime = new Date(datetime);

   const timeDifference = targetTime.getTime() - currentTime.getTime();
   const seconds = Math.floor(timeDifference / 1000);

   if (seconds < 0) {
      return "out date"
   }

   // too lazy to break them in separate function
   if (seconds < 60) {
      return `${seconds} seconds ${seconds < 0 ? "ago" : "from now"}`;
   } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ${seconds < 0 ? "ago" : "from now"}`;
   } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ${seconds < 0 ? "ago" : "from now"}`;
   } else {
      const days = Math.floor(seconds / 86400);
      return `${days} days ${seconds < 0 ? "ago" : "from now"}`;
   }
}

function formatDatetime(datetime: Date): string
{
   const date = new Date(datetime);
   const year = date.getFullYear().toString().slice(2);
   const month = (date.getMonth() + 1).toString().padStart(2, "0");
   const day = date.getDate().toString().padStart(2, "0");
   const hours = date.getHours().toString().padStart(2, "0");
   const minutes = date.getMinutes().toString().padStart(2, "0");

   return `${year}-${month}-${day} ${hours}:${minutes}`
}

export {formatFriendlyDatetime, formatDatetime, formatDateExpire}