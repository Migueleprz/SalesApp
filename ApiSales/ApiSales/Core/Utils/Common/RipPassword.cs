

using ApiSales.Core.Interfaces;

namespace ApiSales.Core.Utils.Common;

public class RipPassword : IRip
{
    public string Rip(string pass)
    {
        string ripPass = string.Empty;
        byte[] encryted = System.Text.Encoding.Unicode.GetBytes(pass);
        ripPass = Convert.ToBase64String(encryted);
        return ripPass;
    }

    public string Unrip(string pass)
    {
        string passUnRip = string.Empty;
        byte[] unrip = Convert.FromBase64String(pass);
        passUnRip = System.Text.Encoding.Unicode.GetString(unrip);
        return passUnRip;
    }
}