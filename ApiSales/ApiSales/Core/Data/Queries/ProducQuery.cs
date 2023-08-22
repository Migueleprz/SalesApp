namespace ApiSales.Core.Data.Queries;

public class ProducQuery
{
    public string SelectAll()
    {
        return @"select * from products order by name desc";
    }

    public string SelectBy()
    {
        return @"select * from products where id = @Id";
    }

    public string InsertInto()
    {
        return @"insert into products(code, name, stock, unit_price ,whs_price ,purch_price) values (@Code, @Name, @Stock, @Unit_price ,@Whs_price ,@Purch_price)";
    }

    public string UpdateSet()
    {
        return @"update products set code=@Code, name=@Name, stock=@Stock, unit_price=@Unit_price ,whs_price=@Whs_price ,purch_price=@Purch_price where id = @Id";
    }

    public string DeleteFrom()
    {
        return @"delete from products where id = @Id";
    }
}