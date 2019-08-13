using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Configuration;
using System.Data.SqlClient;

namespace RESTado
{
    public class ProjectDAO
    {
        string strCon = ConfigurationManager.ConnectionStrings["strCon"].ConnectionString;

        public List<Fruit> SelectAllFruit()
        {
            List<Fruit> fruits = new List<Fruit>();
            SqlConnection con = new SqlConnection(strCon);
            con.Open();
            string strCmd = "SELECT * FROM Fruit";
            SqlCommand cmd = new SqlCommand(strCmd, con);
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                Fruit f = new Fruit();
                f.Id = (int)dr["Id"];
                f.Name = (string)dr["Name"];
                f.Price = (int)dr["Price"];
                f.Season = (string)dr["Season"];
                fruits.Add(f);
            }
            con.Close();
            return fruits;
        }

        public List<CuaHangTraiCay> SelectAllFruitStore()
        {
            List<CuaHangTraiCay> fruitStore = new List<CuaHangTraiCay>();
            SqlConnection con = new SqlConnection(strCon);
            con.Open();
            string strCmd = "SELECT * FROM CuaHangTraiCay";
            SqlCommand cmd = new SqlCommand(strCmd, con);
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                CuaHangTraiCay fStore = new CuaHangTraiCay();
                fStore.Id = (int)dr["Id"];
                fStore.IdLoai = (int)dr["IdLoai"];
                fStore.Image = (string)dr["Image"];
                fStore.Phuong = (string)dr["Phuong"];
                fStore.Quan = (string)dr["Quan"];
                fStore.SoDienThoaiCuaHang = (int)dr["SoDienThoaiCuaHang"];
                fStore.TenChuCuaHang = (string)dr["TenChuCuaHang"];
                fStore.TenCuaHang = (string)dr["TenCuaHang"];
                fStore.ThanhPho = (string)dr["ThanhPho"];
                fStore.DiaChiCuaHang = (string)dr["DiaChiCuaHang"];
                fruitStore.Add(fStore);
            }
            con.Close();
            return fruitStore;
        }

        internal List<Fruit> SelectAllFruitByIdCH(object idCH)
        {
            throw new NotImplementedException();
        }

        public List<Fruit> SelectAllFruitByIdCH(int IdCH)
        {
            List<Fruit> fruits = new List<Fruit>();
            SqlConnection con = new SqlConnection(strCon);
            con.Open();
            string strCmd = "select c.* from cuahangtraicay a, chitietcuahang b, fruit c where a.Id=@Id and a.Id=b.IdCH and b.IdTraiCay = c.Id";
            SqlCommand cmd = new SqlCommand(strCmd, con);
            cmd.Parameters.Add(new SqlParameter("@Id", IdCH));
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                Fruit f = new Fruit();
                f.Id = (int)dr["Id"];
                f.Name = (string)dr["Name"];
                f.Price = (int)dr["Price"];
                f.Season = (string)dr["Season"];
                fruits.Add(f);
            }
            con.Close();
            return fruits;
        }

        public List<ChiNhanh> SelectAllChiNhanhByIdCH(int IdCH)
        {
            List<ChiNhanh> cn = new List<ChiNhanh>();
            SqlConnection con = new SqlConnection(strCon);
            con.Open();
            string strCmd = "select b.* from cuahangtraicay a, chinhanh b where a.Id=@Id and a.Id = b.IdCuaHang";
            SqlCommand cmd = new SqlCommand(strCmd, con);
            cmd.Parameters.Add(new SqlParameter("@Id", IdCH));
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                ChiNhanh c = new ChiNhanh();
                c.DiaChiChiNhanh = (string)dr["DiaChiChiNhanh"];
                c.Id = (int)dr["Id"];
                c.IdCuaHang = (int)dr["IdCuaHang"];
                c.IdLoai = (int)dr["IdLoai"];
                c.Image = (string)dr["Image"];
                c.Phuong = (string)dr["Phuong"];
                c.Quan = (string)dr["Quan"];
                c.SoDienThoaiChiNhanh = (int)dr["SoDienThoaiChiNhanh"];
                c.TenChuChiNhanh = (string)dr["TenChuChiNhanh"];
                c.ThanhPho = (string)dr["ThanhPho"];
                cn.Add(c);
            }
            con.Close();
            return cn;
        }
    }
}