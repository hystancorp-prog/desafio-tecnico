import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Bem vindo!\n");

        String tipo;
        do {
            System.out.println("Qual é o tipo de combustível? (G/A/D)");
            System.out.println(" G - Gasolina \n A - Álcool \n D - Diesel");
            tipo = scanner.next().toUpperCase();
            if (!tipo.equals("G") && !tipo.equals("A") && !tipo.equals("D")) {
                System.out.println("Tipo inválido, tente novamente!\n");
            }
        } while (!tipo.equals("G") && !tipo.equals("A") && !tipo.equals("D"));

        float quantidade = 0;
        boolean quantidadeValida = false;
        do {
            System.out.println("\nQual é a quantidade em litros?");
            if (scanner.hasNextFloat()) {
                quantidade = scanner.nextFloat();
                if (quantidade <= 0) {
                    System.out.println("Quantidade inválida, tente novamente!");
                } else {
                    quantidadeValida = true;
                }
            } else {
                System.out.println("Digite um número válido!");
                scanner.next();
            }
        } while (!quantidadeValida);

        float preco = 0;
        if (tipo.equals("G")) preco = 5.50f;
        else if (tipo.equals("A")) preco = 4.20f;
        else if (tipo.equals("D")) preco = 6.80f;

        float totalBruto = quantidade * preco;
        float totalLiquido = totalBruto;

        String fidelidade;
        do {
            System.out.println("\nPossui fidelidade? (S/N)");
            fidelidade = scanner.next().toUpperCase();
            if (!fidelidade.equals("S") && !fidelidade.equals("N")) {
                System.out.println("Opção inválida, tente novamente!\n");
            }
        } while (!fidelidade.equals("S") && !fidelidade.equals("N"));

        if (fidelidade.equals("S")) {
            float desconto = 0;
            if (tipo.equals("G")) desconto = 0.03f;
            else if (tipo.equals("A")) desconto = 0.05f;
            else if (tipo.equals("D")) desconto = 0.02f;

            totalLiquido -= totalLiquido * desconto;

            if (quantidade >= 40) {
                totalLiquido -= 5.00f;
            }
        }

        System.out.printf("%nTotal bruto:   R$ %.2f%n", totalBruto);
        System.out.printf("Total líquido: R$ %.2f%n", totalLiquido);

        scanner.close();
    }
}