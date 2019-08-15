using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RESTado.Controllers
{
    [RoutePrefix("api")]
    public class ProjectController : ApiController
    {
        // GET api/<controller>
        [HttpGet, Route("getAllFruit")]
        public List<Fruit> Get()
        {
            List<Fruit> fruits = new ProjectDAO().SelectAllFruit();
            return fruits;
        }

        [HttpGet, Route("getAllFruitStore")]
        public List<CuaHangTraiCay> GetFruitStore()
        {
            List<CuaHangTraiCay> fruitStores = new ProjectDAO().SelectAllFruitStore();
            return fruitStores;
        }

        [HttpGet, Route("getAllFruitStore/{keyword}")]
        public List<CuaHangTraiCay> GetFruitStoreByKeyword(string keyword)
        {
            List<CuaHangTraiCay> fruitStore = new ProjectDAO().SelectFruitStoreByKeyword(keyword);
            return fruitStore;
        }

        [HttpGet, Route("getAllFruitStore/distrist/{distrist}")]
        public List<CuaHangTraiCay> GetFruitStoreByDistrist(string distrist)
        {
            List<CuaHangTraiCay> fruitStore = new ProjectDAO().SelectFruitStoreByDistrist(distrist);
            return fruitStore;
        }

        [HttpGet, Route("getAllFruitChiNhanh")]
        public List<ChiNhanh> GetFruitChiNhanh()
        {
            List<ChiNhanh> cn = new ProjectDAO().SelectAllFruitChiNhanh();
            return cn;
        }

        [HttpGet, Route("getAllFruitChiNhanh/{idch}")]
        public List<ChiNhanh> GetFruitChiNhanhByIdCH(int idch)
        {
            List<ChiNhanh> cn = new ProjectDAO().SelectAllChiNhanhByIdCH(idch);
            return cn;
        }

        [HttpGet, Route("getAllFruitChiNhanh/{idch}/{keyword}")]
        public List<ChiNhanh> GetFruitChiNhanhByKeyword(string keyword, int idch)
        {
            List<ChiNhanh> cn = new ProjectDAO().SelectFruitChiNhanhByKeywordAndIdCH(keyword, idch);
            return cn;
        }

        [HttpGet, Route("getFruitAndChiNhanhByIdCH/{idCH:int}")]
        public Object GetFruitAndChiNhanh(int IdCH)
        {
            List<ChiNhanh> cn = new ProjectDAO().SelectAllChiNhanhByIdCH(IdCH);
            List<Fruit> fruits = new ProjectDAO().SelectAllFruitByIdCH(IdCH);
            List<BinhLuanCuaHang> cmt = new ProjectDAO().SelectAllBinhLuanByIdCH(IdCH);

            ChiNhanhVaTraiCayByIdCH cnFruit = new ChiNhanhVaTraiCayByIdCH(cn, fruits, cmt);
            return (Object)cnFruit;
        }

        [HttpPost, Route("updateChiNhanhByIdAndIdCH/{idCH:int}")]
        public bool UpdateChiNhanh(ChiNhanh newCn, int idCH)
        {
            bool result = new ProjectDAO().UpdateChiNhanh(newCn, idCH);
            return result;
        }

        [HttpPost, Route("addChiNhanh")]
        public bool AddChiNhanh(ChiNhanh newCn)
        {
            bool result = new ProjectDAO().AddChiNhanh(newCn);
            return result;
        }

        [HttpDelete, Route("deleteChiNhanh/{id}")]
        public bool DeleteChiNhanh(int id)
        {
            bool result = new ProjectDAO().DeleteChiNhanh(id);
            return result;
        }

        
    }
}