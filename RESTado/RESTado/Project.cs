using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RESTado
{
    public class Fruit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Season { get; set; }
    }

    public class CuaHangTraiCay
    {
        public int Id { get; set; }
        public int IdLoai { get; set; }
        public string TenChuCuaHang { get; set; }
        public int SoDienThoaiCuaHang { get; set; }
        public string DiaChiCuaHang { get; set; }
        public string Phuong { get; set; }
        public string Quan { get; set; }
        public string ThanhPho { get; set; }
        public string TenCuaHang { get; set; }
        public string Image { get; set; }
    }

    public class ChiNhanh
    {
        public int Id { get; set; }
        public int IdLoai { get; set; }
        public string TenChuChiNhanh { get; set; }
        public int SoDienThoaiChiNhanh { get; set; }
        public string DiaChiChiNhanh { get; set; }
        public string Phuong { get; set; }
        public string Quan { get; set; }
        public string ThanhPho { get; set; }
        public int IdCuaHang { get; set; }
        public string Image { get; set; }
    }

    public class BinhLuanCuaHang
    {
        public int Id { get; set; }
        public string PhoneAcc { get; set; }
        public string BinhLuan { get; set; }
        public int IdCuaHang { get; set; }
    }

    public class ChiNhanhVaTraiCayByIdCH
    {
        public ChiNhanhVaTraiCayByIdCH(List<ChiNhanh> cn, List<Fruit> fruits, List<BinhLuanCuaHang> cmt)
        {
            ChiNhanh = cn;
            Fruits = fruits;
            BinhLuan = cmt;
        }

        public List<ChiNhanh> ChiNhanh { get; set; }
        public List<Fruit> Fruits { get; set; }
        public List<BinhLuanCuaHang> BinhLuan { get; set; }
    }

    public class ChiTietCuaHang
    {
        public int Id { get; set; }
        public int IdCH { get; set; }
        public int IdTraiCay { get; set; }
    }

    public class ChiTietChiNhanh
    {
        public int Id { get; set; }
        public int IdCN { get; set; }
        public int IdTraiCay { get; set; }
    }

    public class Account
    {
        public string Phone { get; set; }
        public string Name { get; set; }
    }
}