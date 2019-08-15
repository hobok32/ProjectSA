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

        public List<CuaHangTraiCay> SelectFruitStoreByKeyword(string keyword)
        {
            List<CuaHangTraiCay> fruitStore = new List<CuaHangTraiCay>();
            SqlConnection con = new SqlConnection(strCon);
            con.Open();
            string strCmd = "SELECT * FROM CuaHangTraiCay WHERE TenCuaHang LIKE '%" + keyword + "%'";
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

        public List<CuaHangTraiCay> SelectFruitStoreByDistrist(string distrist)
        {
            List<CuaHangTraiCay> fruitStore = new List<CuaHangTraiCay>();
            SqlConnection con = new SqlConnection(strCon);
            con.Open();
            string strCmd = "SELECT * FROM CuaHangTraiCay WHERE Quan LIKE '%" + distrist + "%'";
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

        public List<ChiNhanh> SelectAllFruitChiNhanh()
        {
            List<ChiNhanh> cn = new List<ChiNhanh>();
            SqlConnection con = new SqlConnection(strCon);
            con.Open();
            string strCmd = "SELECT * FROM ChiNhanh";
            SqlCommand cmd = new SqlCommand(strCmd, con);
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

        public List<ChiNhanh> SelectFruitChiNhanhByKeywordAndIdCH(string keyword, int IdCH)
        {
            List<ChiNhanh> cn = new List<ChiNhanh>();
            SqlConnection con = new SqlConnection(strCon);
            con.Open();
            string strCmd = "SELECT a.* FROM ChiNhanh a, CuaHangTraiCay b WHERE TenChuChiNhanh LIKE '%" + keyword + "%' and a.IdCuaHang=b.Id and b.Id=@Id";
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

        public List<BinhLuanCuaHang> SelectAllBinhLuanByIdCH(int IdCH)
        {
            List<BinhLuanCuaHang> cmt = new List<BinhLuanCuaHang>();
            SqlConnection con = new SqlConnection(strCon);
            con.Open();
            string strCmd = "select a.* from binhluancuahang a, cuahangtraicay b where a.IdCuaHang=b.Id and a.IdCuaHang = @Id";
            SqlCommand cmd = new SqlCommand(strCmd, con);
            cmd.Parameters.Add(new SqlParameter("@Id", IdCH));
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                BinhLuanCuaHang c = new BinhLuanCuaHang();
                c.Id = (int)dr["Id"];
                c.PhoneAcc = (string)dr["PhoneAcc"];
                c.BinhLuan = (string)dr["BinhLuan"];
                c.IdCuaHang = (int)dr["IdCuaHang"];
                cmt.Add(c);
            }
            con.Close();
            return cmt;
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

        public bool UpdateChiNhanh(ChiNhanh newCn, int IdCH)
        {
            SqlConnection con = new SqlConnection(strCon);
            con.Open();
            string strCmd = "UPDATE a SET a.IdLoai=@IdLoai, a.Image=@Image, a.TenChuChiNhanh=@TenChuChiNhanh, a.SoDienThoaiChiNhanh=@SoDienThoaiChiNhanh,a.DiaChiChiNhanh=@DiaChiChiNhanh,a.Phuong=@Phuong, a.Quan=@Quan, a.ThanhPho=@ThanhPho, a.IdCuaHang=@IdCuaHang from ChiNhanh a, Cuahangtraicay b WHERE a.Id=@Id and a.IdCuaHang=b.Id and b.Id=@IdCH";
            SqlCommand cmd = new SqlCommand(strCmd, con);
            cmd.Parameters.Add(new SqlParameter("@Id", newCn.Id));
            cmd.Parameters.Add(new SqlParameter("@IdCH", IdCH));
            cmd.Parameters.Add(new SqlParameter("@IdLoai", newCn.IdLoai));
            cmd.Parameters.Add(new SqlParameter("@Image", newCn.Image));
            cmd.Parameters.Add(new SqlParameter("@TenChuChiNhanh", newCn.TenChuChiNhanh));
            cmd.Parameters.Add(new SqlParameter("@SoDienThoaiChiNhanh", newCn.SoDienThoaiChiNhanh));
            cmd.Parameters.Add(new SqlParameter("@DiaChiChiNhanh", newCn.DiaChiChiNhanh));
            cmd.Parameters.Add(new SqlParameter("@Phuong", newCn.Phuong));
            cmd.Parameters.Add(new SqlParameter("@Quan", newCn.Quan));
            cmd.Parameters.Add(new SqlParameter("@ThanhPho", newCn.ThanhPho));
            cmd.Parameters.Add(new SqlParameter("@IdCuaHang", newCn.IdCuaHang));
            return cmd.ExecuteNonQuery() > 0;
        }

        public bool DeleteChiNhanh(int IdCN)
        {
            SqlConnection con = new SqlConnection(strCon);
            con.Open();
            string strCmd = "DELETE FROM ChiNhanh WHERE Id=@Id";
            string strCmd1 = "DELETE FROM chitietchinhanh WHERE IdCN=@Id";
            SqlCommand cmd = new SqlCommand(strCmd, con);
            SqlCommand cmd1 = new SqlCommand(strCmd1, con);
            cmd.Parameters.Add(new SqlParameter("@Id", IdCN));
            cmd1.Parameters.Add(new SqlParameter("@Id", IdCN));
            cmd1.ExecuteNonQuery();
            return cmd.ExecuteNonQuery() > 0;
        }

        public bool AddChiNhanh(ChiNhanh newCn)
        {
            SqlConnection con = new SqlConnection(strCon);
            con.Open();
            string strCmd = "INSERT INTO ChiNhanh VALUES (@IdLoai,@TenChuChiNhanh,@SoDienThoaiChiNhanh,@DiaChiChiNhanh,@Phuong,@Quan,@ThanhPho,@IdCuaHang,@Image)";
            SqlCommand cmd = new SqlCommand(strCmd, con);
            cmd.Parameters.Add(new SqlParameter("@IdLoai", newCn.IdLoai));
            cmd.Parameters.Add(new SqlParameter("@Image", newCn.Image));
            cmd.Parameters.Add(new SqlParameter("@TenChuChiNhanh", newCn.TenChuChiNhanh));
            cmd.Parameters.Add(new SqlParameter("@SoDienThoaiChiNhanh", newCn.SoDienThoaiChiNhanh));
            cmd.Parameters.Add(new SqlParameter("@DiaChiChiNhanh", newCn.DiaChiChiNhanh));
            cmd.Parameters.Add(new SqlParameter("@Phuong", newCn.Phuong));
            cmd.Parameters.Add(new SqlParameter("@Quan", newCn.Quan));
            cmd.Parameters.Add(new SqlParameter("@ThanhPho", newCn.ThanhPho));
            cmd.Parameters.Add(new SqlParameter("@IdCuaHang", newCn.IdCuaHang));
            return cmd.ExecuteNonQuery() > 0;
        }
        
    }
}