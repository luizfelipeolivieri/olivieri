import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Digite um e-mail válido."),
  password: z.string().min(6, "Digite uma senha com pelo menos 6 caracteres."),
});
