import z from "zod";

const userScema = z
  .object({
    Fornavn: z.string("Huh?").min(2, "Navn er for kort."),
    Efternavn: z.string("Lyder rigtigt nok").min(2, "Efternavn er for kort"),
    Email: z.email("Email er ikke korrect"),
    Password: z
      .string("")
      .min(8, "Kode skal være mere end 8 figure")
      .regex(/[1-9]/, "SKAL HAVDE MINDST ET TAL")
      .regex(/[!@#$%^&*]/, "SKAL HAVDE MINDST EN! '!@#$%^&*'")
      .regex(/[a-zæøå]/, "SKAL HAVDE små BOGSTAVER!")
      .regex(/[A-ZÆØÅ]/, "SKAL HAVDE STORE BOGSTAVER!"),
    RepeatPassword: z.string("").nonempty("Adgangskode felt er tomt"),
    Fødselsdag: z.string(),
    Nummer: z.coerce
      .number("Tak for dit nummer shorty")
      .min(10000000, "DU SKAL HAVDE 8 TAL!"),
  })
  .refine((schema) => schema.Password === schema.RepeatPassword, {
    path: ["RepeatPassword"],
    message: "IKKE ENS!!",
  });

export default userScema;
