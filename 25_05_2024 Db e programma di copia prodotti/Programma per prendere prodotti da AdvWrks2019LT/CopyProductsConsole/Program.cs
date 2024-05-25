using CopyProductsConsole.BLogic;
using System;
using System.Configuration;
using System.Text;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CopyProductsConsole
{
    internal class Program
    {
        static void Main(string[] args)
        {
            DbUtility dbUtility = new(ConfigurationManager.AppSettings["AdvWorks2019LT"], "Data Source=DESKTOP-FLOAKPO\\SQLEXPRESS01;Initial Catalog=Betacycle;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False");
            if (dbUtility.IsDbStatusValid1 && dbUtility.IsDbStatusValid2)
            {
                //dbUtility.GetModels().ForEach(m => Console.WriteLine($"ModelloID: {m.ProductModelID} - Nome: {m.Name}"));
                dbUtility.GetModels().ForEach(m => Console.WriteLine($"Inserito Modello? - {dbUtility.InsertModlesIntoBetacycle(m.Name)}"));

                //dbUtility.GetCategories().ForEach(c => Console.WriteLine($"CategoriaID: {c.ProductCategoryID} - Nome: {c.Name}"));
                dbUtility.GetCategories().ForEach(c => Console.WriteLine($"Inserito Categoria? - {dbUtility.InsertCategoriesIntoBetacycle(c.Name)}"));

                //dbUtility.GetProducts().ForEach(p => Console.WriteLine($"ProdottoID: {p.ProductID} - Nome: {p.Name}"));
                dbUtility.GetProducts().ForEach(p => Console.WriteLine($"Inserito Prodotto? - {dbUtility.InsertProductsIntoBetacycle(p)}"));
            }
            else
            {
                Console.WriteLine("database NON raggiungibile. Chiusura anticipata del programma.");
            }
        }
    }
}
