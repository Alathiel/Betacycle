using CopyProductsConsole.DataModels;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CopyProductsConsole.BLogic
{
    internal class DbUtility
    {
        SqlConnection sqlCnn1 = new();
        SqlConnection sqlCnn2 = new();
        SqlCommand sqlCmd1 = new();
        SqlCommand sqlCmd2 = new();

        public bool IsDbStatusValid1 = false;
        public bool IsDbStatusValid2 = false;

        public DbUtility(string sqlConnectionString1, string sqlConnectionString2)
        {
            sqlCnn1.ConnectionString = sqlConnectionString1;
            sqlCnn2.ConnectionString = sqlConnectionString2;

            try
            {
                using (SqlConnection sqlConnection1 = sqlCnn1)
                {
                    sqlConnection1.Open();
                    sqlCnn1 = new SqlConnection(sqlConnection1.ConnectionString);
                    IsDbStatusValid1 = true;

                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Errore durante la connessione con il Database AdventureWorks: {e.Message}");
                throw;
            }

            try
            {
                using (SqlConnection sqlConnection2 = sqlCnn2)
                {
                    sqlConnection2.Open();
                    sqlCnn2 = new SqlConnection(sqlConnection2.ConnectionString);
                    IsDbStatusValid2 = true;

                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Errore durante la connessione con il Database Betacycle: {e.Message}");
                throw;
            }
        }

        internal List<Model> GetModels()
        {
            List<Model> models = [];

            try
            {
                sqlCmd1.CommandText = "SELECT * FROM SalesLT.ProductModel";
                sqlCmd1.Connection = sqlCnn1;

                CheckDbOpen();
                using (SqlDataReader sqlReader = sqlCmd1.ExecuteReader())
                {
                    if (sqlReader.HasRows)
                    {
                        while (sqlReader.Read()) //Continua ad andare avanti ficnhè non ci sono più righe
                        {
                            Model model = new();
                            //Fare un cast per convertire gli oggetti presi dal DB
                            model.ProductModelID = Convert.ToInt16(sqlReader["ProductModelID"]);
                            model.Name = Convert.ToString(sqlReader["Name"]);

                            models.Add(model);
                        }
                    }
                }

                //CheckDbClose();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                CheckDbClose();
            }

            return models;
        }

        internal int InsertModlesIntoBetacycle(string name)
        {
            int rowsAffected = 0;
            try
            {
                CheckDbOpenBeta();
                sqlCmd2.CommandText = "INSERT INTO [dbo].[Model] ([Name]) VALUES (@name)";
                sqlCmd2.Connection = sqlCnn2;

                sqlCmd2.Parameters.AddWithValue("@name", name);

                sqlCmd2.Connection = sqlCnn2;
                rowsAffected = sqlCmd2.ExecuteNonQuery();
                CheckDbCloseBeta();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Errore Update: {ex.Message}");
                throw;
            }

            return rowsAffected;
        }

        internal List<Category> GetCategories()
        {
            List<Category> categories = [];

            try
            {
                sqlCmd1.CommandText = "SELECT * FROM SalesLT.ProductCategory";
                sqlCmd1.Connection = sqlCnn1;

                CheckDbOpen();
                using (SqlDataReader sqlReader = sqlCmd1.ExecuteReader())
                {
                    if (sqlReader.HasRows)
                    {
                        while (sqlReader.Read()) //Continua ad andare avanti ficnhè non ci sono più righe
                        {
                            Category category = new();
                            //Fare un cast per convertire gli oggetti presi dal DB
                            category.ProductCategoryID = Convert.ToInt16(sqlReader["ProductCategoryID"]);
                            category.Name = Convert.ToString(sqlReader["Name"]);

                            categories.Add(category);
                        }
                    }
                }

                //CheckDbClose();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                CheckDbClose();
            }

            return categories;
        }

        internal int InsertCategoriesIntoBetacycle(string name)
        {
            int rowsAffected = 0;
            try
            {
                CheckDbOpenBeta();
                sqlCmd2.CommandText = "INSERT INTO [dbo].[Category] ([Name]) VALUES (@name)";
                sqlCmd2.Connection = sqlCnn2;

                sqlCmd2.Parameters.AddWithValue("@name", name);

                sqlCmd2.Connection = sqlCnn2;
                rowsAffected = sqlCmd2.ExecuteNonQuery();
                CheckDbCloseBeta();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Errore Update: {ex.Message}");
                throw;
            }

            return rowsAffected;
        }

        internal List<Product> GetProducts()
        {
            List<Product> products = [];

            try
            {
                sqlCmd1.CommandText = "SELECT * FROM SalesLT.Product";
                sqlCmd1.Connection = sqlCnn1;

                CheckDbOpen();
                using (SqlDataReader sqlReader = sqlCmd1.ExecuteReader())
                {
                    if (sqlReader.HasRows)
                    {
                        while (sqlReader.Read()) //Continua ad andare avanti ficnhè non ci sono più righe
                        {
                            Product product = new();
                            //Fare un cast per convertire gli oggetti presi dal DB
                            product.ProductID = Convert.ToInt32(sqlReader["ProductID"]);
                            product.Name = Convert.ToString(sqlReader["Name"]);
                            product.ProductNumber = Convert.ToString(sqlReader["ProductNumber"]);
                            product.Color = Convert.ToString(sqlReader["Color"]);
                            product.StandardCost = Convert.ToDecimal(sqlReader["StandardCost"]);
                            product.ListPrice = Convert.ToDecimal(sqlReader["ListPrice"]);
                            product.Size = Convert.ToString(sqlReader["Size"]);
                            if (sqlReader["Weight"] != DBNull.Value) product.Weght = Convert.ToDecimal(sqlReader["Weight"]);
                            product.ProductCategoryID = Convert.ToInt32(sqlReader["ProductCategoryID"]);
                            product.ProductModelID = Convert.ToInt32(sqlReader["ProductModelID"]);
                            product.SellStartDate = Convert.ToDateTime(sqlReader["SellStartDate"]);
                            if(sqlReader["SellEndDate"] != DBNull.Value) product.SellEndDate = Convert.ToDateTime(sqlReader["SellEndDate"]);
                            if (sqlReader["DiscontinuedDate"] != DBNull.Value) product.DiscontinuedDate = Convert.ToDateTime(sqlReader["DiscontinuedDate"]);
                            product.ThumbNailPhoto = (byte[]?)sqlReader["ThumbNailPhoto"];
                            product.ThumbnailPhotoFileName = Convert.ToString(sqlReader["ThumbNailPhotoFileName"]);
                            product.ModifiedDate = Convert.ToDateTime(sqlReader["ModifiedDate"]);

                            products.Add(product);
                        }
                    }
                }

                //CheckDbClose();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                CheckDbClose();
            }

            return products;
        }

        internal int InsertProductsIntoBetacycle(Product prod)
        {
            int rowsAffected = 0;
            try
            {
                CheckDbOpenBeta();
                sqlCmd2.CommandText = "INSERT INTO [dbo].[Product]" +
                    "([ProductName]" +
                    ",[ProductNumber]" +
                    ",[ModelId]" +
                    ",[InsertPrice]" +
                    ",[ActualPrice]" +
                    ",[Color]" +
                    ",[Weight]" +
                    ",[Culture]" +
                    ",[CategoryID]" +
                    ",[DateInsert]" +
                    ",[LastModify]" +
                    ",[ThumbnailPhoto]" +
                    ",[ThumbnailPhotoFileName])" +

                    " VALUES (@name" +
                    ",@prodnumber" +
                    ",@modelid" +
                    ",@insertprice" +
                    ",@actualprice" +
                    ",@color" +
                    ",@weight" +
                    ",@culture" +
                    ",@categoryid" +
                    ",@dateinsert" +
                    ",@lastmodified" +
                    ",@photo" +
                    ",@photoname)";
                sqlCmd2.Connection = sqlCnn2;

                sqlCmd2.Parameters.AddWithValue("@name", prod.Name);
                sqlCmd2.Parameters.AddWithValue("@prodnumber", prod.ProductNumber);
                sqlCmd2.Parameters.AddWithValue("@modelid", prod.ProductModelID);
                sqlCmd2.Parameters.AddWithValue("@insertprice", prod.StandardCost);
                sqlCmd2.Parameters.AddWithValue("@actualprice", prod.ListPrice);
                sqlCmd2.Parameters.AddWithValue("@color", prod.Color);
                sqlCmd2.Parameters.AddWithValue("@weight", prod.Weght);
                sqlCmd2.Parameters.AddWithValue("@culture", prod.culture);
                sqlCmd2.Parameters.AddWithValue("@categoryid", prod.ProductCategoryID);
                sqlCmd2.Parameters.AddWithValue("@dateinsert", prod.SellStartDate);
                sqlCmd2.Parameters.AddWithValue("@lastmodified", prod.ModifiedDate);
                sqlCmd2.Parameters.AddWithValue("@photo", prod.ThumbNailPhoto);
                sqlCmd2.Parameters.AddWithValue("@photoname", prod.ThumbnailPhotoFileName);


                sqlCmd2.Connection = sqlCnn2;
                rowsAffected = sqlCmd2.ExecuteNonQuery();
                CheckDbCloseBeta();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Errore Update: {ex.Message}");
                throw;
            }

            return rowsAffected;
        }

        void CheckDbOpen()
        {
            //Se la connessione è chiusa, aprila
            if (sqlCnn1.State == System.Data.ConnectionState.Closed && sqlCnn2.State == System.Data.ConnectionState.Closed)
            {
                sqlCnn1.Open();
                sqlCnn2.Open();
            }

            //sqlCmd.Parameters.Clear(); //IMPORTANTE
        }

        void CheckDbClose()
        {
            //Se la connessione è aperta, chiudila
            if (sqlCnn1.State == System.Data.ConnectionState.Open && sqlCnn2.State == System.Data.ConnectionState.Open)
            {
                sqlCnn1.Close();
                sqlCnn2.Close();
            }

            sqlCmd1.Parameters.Clear(); //IMPORTANTE
            sqlCmd2.Parameters.Clear(); //IMPORTANTE
        }

        void CheckDbOpenBeta()
        {
            //Se la connessione è chiusa, aprila
            if (sqlCnn2.State == System.Data.ConnectionState.Closed)
            {
                sqlCnn2.Open();
            }

            //sqlCmd.Parameters.Clear(); //IMPORTANTE
        }

        void CheckDbCloseBeta()
        {
            //Se la connessione è aperta, chiudila
            if (sqlCnn2.State == System.Data.ConnectionState.Open)
            {
                sqlCnn2.Close();
            }

            sqlCmd2.Parameters.Clear(); //IMPORTANTE
        }

    }
}
