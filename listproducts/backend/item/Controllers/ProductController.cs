using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using item.Data;
using item.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace item.Controllers {
    [ApiController]
    [Route ("v1/products")]

    public class ProductController : ControllerBase {

        [HttpGet]
        [Route ("")]
        public async Task<ActionResult<List<Product>>> Get ([FromServices] DataContext context) {
            var products = await context.Products.ToListAsync ();
            return products;

        }

        [HttpGet]
        [Route ("{id:int}")]
        public async Task<ActionResult<Product>> GetById ([FromServices] DataContext context, int id) {
            var products = await context.Products.FirstOrDefaultAsync (x => x.Id == id);
            return products;

        }

        [HttpPost]
        [Route ("")]
        public async Task<ActionResult<Product>> Post ([FromServices] DataContext context, [FromBody] Product model) {

            context.Products.Add (model);
            await context.SaveChangesAsync ();
            return model;

        }

        [HttpPut]
        [Route ("{id}")]
        public async Task<ActionResult> Put (int id, [FromServices] DataContext context, [FromBody] Product product) {
            if (product.Id != id) {
                return BadRequest ();
            }
            context.Entry (product).State = EntityState.Modified;
            await context.SaveChangesAsync ();
            return NoContent ();
        }
        /*
        [HttpDelete]
        [Route ("{id}")]
        public async Task<ActionResult> Delete (int id, [FromServices] DataContext context, [FromBody] Product product) {

            var product = await context.Product.FindAsync (id);
            if (product == null) {
                return NotFound ();
            }
            context.Product.Remove (product);
            await _context.SaveChangesAsync ();

            return product;
        }
        */

    }
}