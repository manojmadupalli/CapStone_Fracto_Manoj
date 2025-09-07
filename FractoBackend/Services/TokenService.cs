using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using FractoBackend.Models;

namespace FractoBackend.Services
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _cfg;
        public TokenService(IConfiguration cfg) { _cfg = cfg; }

        public string CreateToken(User user)
        {
            var key = _cfg["Jwt:Key"] ?? "ChangeThisInProd";
            var issuer = _cfg["Jwt:Issuer"] ?? "fracto";
            var audience = _cfg["Jwt:Audience"] ?? "fracto_users";

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim("userid", user.UserId.ToString()),
                new Claim(ClaimTypes.Role, user.Role ?? "User")
            };

            var creds = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)), SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(issuer, audience, claims, expires: DateTime.UtcNow.AddDays(7), signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
