import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Bem vindo!\n");

        double quantidade = 0;
        boolean quantidadeValida = false;
        do {
            System.out.println("Informe o valor total de gorjetas:");
            if (scanner.hasNextDouble()) {
                quantidade = scanner.nextDouble();
                if (quantidade <= 0) {
                    System.out.println("Valor inválido, tente novamente!\n");
                } else {
                    quantidadeValida = true;
                }
            } else {
                System.out.println("Digite um número válido!\n");
                scanner.next();
            }
        } while (!quantidadeValida);

        int garcons = 0;
        boolean garconsValido = false;
        do {
            System.out.println("\nInforme o número de garçons:");
            if (scanner.hasNextInt()) {
                garcons = scanner.nextInt();
                if (garcons <= 0) {
                    System.out.println("Número inválido, tente novamente!\n");
                } else {
                    garconsValido = true;
                }
            } else {
                System.out.println("Digite um número inteiro válido!\n");
                scanner.next();
            }
        } while (!garconsValido);

        double porGarcom = Math.floor(quantidade / garcons);
        double saldoRestante = quantidade - (porGarcom * garcons);

        System.out.printf("%nCada garçom receberá: R$ %.2f%n", porGarcom);
        System.out.printf("Saldo para premiação: R$ %.2f%n", saldoRestante);

        scanner.close();
    }
}