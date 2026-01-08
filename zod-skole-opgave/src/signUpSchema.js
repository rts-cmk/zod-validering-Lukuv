import z from "zod";

const userScema = z
  .object({
    Fornavn: z.string("Huh?").min(2, "Navn er for kort."),
    Efternavn: z.string("Lyder rigtigt nok").min(2, "Efternavn er for kort"),
    Email: z.email("Email er ikke korrect"),
    Password: z
      .string("")
      .min(8, "Kode skal være mere end 8 figure")
      .regex(/[1-9]/, "Skal indholde mindst 1 tal")
      .regex(
        /[!@#$%^&*]/,
        "Skal indeholde mindst en special karakter '!@#$%^&*'"
      )
      .regex(/[a-zæøå]/, "Skal havde mindst 1 småt bogstav!")
      .regex(/[A-ZÆØÅ]/, "Skal havde mindst 1 stort bogstav!"),
    RepeatPassword: z.string("").nonempty("Gentag adgangskode skal udfyldes"),
    Brugernavn: z
      .string()
      .min(4, "Brugernavn skal mindst være 4 bogstaver")
      .includes("_", "Skal indeholde '_'")
      .refine((str) => {
        let count = 0;
        for (let char of str) {
          if (char >= "0" && char <= "9") {
            count++;
          }
        }
        return count >= 4;
      }, "Brugernavn skal indeholde mindst 4 tal"),
    Fødselsdag: z
      .string("Indtast Dato")
      .transform((str) => new Date(str))
      .pipe(
        z.date().refine((date) => {
          const today = new Date();
          let age = today.getFullYear() - date.getFullYear();
          const monthDiff = today.getMonth() - date.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < date.getDate())
          ) {
            age--;
          }
          return age >= 18;
        }, "Du er ikke 18 år!")
      ),
    Nummer: z.coerce
      .number("Tak for dit nummer shorty")
      .min(10000000, "Telefon nummer er for kort")
      .max(99999999, "Telefon nummer er for langt"),
    Adress: z.string().min(5, "Ikke gyldig adresse"),
    Postnummer: z.string().min(4, "Postnummer kan kun være 4 tal").max(4, "Postnummer for langt")
  })
  .refine((schema) => schema.Password === schema.RepeatPassword, {
    path: ["RepeatPassword"],
    message: "IKKE ENS!!",
  });

export default userScema;
