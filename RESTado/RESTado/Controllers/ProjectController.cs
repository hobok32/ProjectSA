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

        [HttpGet, Route("getFruitAndChiNhanhByIdCH/{idCH:int}")]
        public Object GetFruitAndChiNhanh(int IdCH)
        {
            List<ChiNhanh> cn = new ProjectDAO().SelectAllChiNhanhByIdCH(IdCH);
            List<Fruit> fruits = new ProjectDAO().SelectAllFruitByIdCH(IdCH);

            ChiNhanhVaTraiCayByIdCH cnFruit = new ChiNhanhVaTraiCayByIdCH(cn, fruits);
            return (Object)cnFruit;
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}