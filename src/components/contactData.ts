export const EMAIL = "synapstream.online@gmail.com";
export const PHONES = ["01612750788", "01796222976"];
export const OFFICE = "4213, Oxygen, Chittagong, Bangladesh.";

export const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:;SYNAPSTREAM;;;",
  "FN:SYNAPSTREAM",
  "ORG:SYNAPSTREAM",
  `TEL;TYPE=WORK,VOICE:${PHONES[0]}`,
  `TEL;TYPE=CELL,VOICE:${PHONES[1]}`,
  `EMAIL;TYPE=WORK:${EMAIL}`,
  "ADR;TYPE=WORK:;;4213, Oxygen;Chittagong;;4213;Bangladesh",
  "END:VCARD",
].join("\r\n");

export function downloadVCard() {
  const url = URL.createObjectURL(new Blob([VCARD], { type: "text/vcard;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "synapstream.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
