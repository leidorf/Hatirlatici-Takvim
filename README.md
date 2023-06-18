# Hatırlatıcı Takvim
Bu proje, kullanıcıların takvimlerini yönetmelerine yardımcı olan basit bir web uygulamasıdır. Kullanıcılar, takvimde olaylar tanımlayabilir, takvimdeki olayları görüntüleyebilir, hatırlatmalar alabilir.

## Özellikler
- Kullanıcılar sisteme kaydolabilir ve giriş yapabilir.
- Takvimdeki belirli bir güne geçiş yapabilirsiniz.
- Olayları tanımlayabilir, düzenleyebilir ve silebilirsiniz.
- Tanımlanan olaylar zamanı geldiğinde hatırlatmalarla kullanıcılara bildirilir.


# Nasıl Kullanılır?

## Kayıt Olma
Halihazırda hesabınız yoksa site açıldığında karşınıza çıkan "Giriş Yap / Kayıt Ol" butonu ile kayıt olma formunu açıp sisteme kayıt olabilirsiniz. 

## Etkinlik Ekleme
Hatırlatıcı Takvim'e giriş yaptığınızda yukarıdaki "Önceki" ve "Sonraki" butonlarıyla istediğiniz ayı ve yılı belirleyebilirsiniz. 
Ayı ve yılı belirledikten sonra etkinlik eklemek istediğiniz günü seçip etkinliğin açıklamasını ve zamanını belirleyerek "Kaydet" tuşuna basarak etkinlik ekleyebilirsiniz.

## Etkinlik Düzenleme
Etkinlik gününe tıkladığınızda açılan etkinlik ekranında etkinliğin üzerine tıklayarak zamanını ve içeriğini düzenleyip "Kaydet" butonu ile düzenlemenizi kaydedebilirsiniz.

## Etkinlik Silme
Etkinlik ekranındaki en sağdaki "Sil" butonu ile etkinliği silebilirsiniz.

## Ekran Görüntüleri
- Uygulama Giriş Ekranı
  
![Ekran görüntüsü 2023-06-17 233824](https://github.com/leidorf/Hatirlatici-Takvim/assets/93585259/b3fbb2f1-efc6-4be1-90df-7f384032f83b)

- Uygulama Ana Ekranı
  
![Ekran görüntüsü 2023-06-17 233846](https://github.com/leidorf/Hatirlatici-Takvim/assets/93585259/9615d2ea-00fa-4e09-bb99-cbaff8a720ce)

## Proje Dosya Yapısı
Projede, temel web uygulama dosya yapısı kullanılmıştır.

```
hatirlatici-takvim
├── .gitattributes
├── .gitignore
├── index.html
├── LICENSE
├── README.md
├── pages
│   └── calendar.html
├── resources
│   ├── css
│   │   └── style.css
│   └── js
│       ├── calendar.js
│       └── login.js
└── server
    ├── package-lock.json
    ├── package.json
    ├── server.js
    ├── controllers
    │   └── userController.js
    └── db
        └── dbConnection.js
```

# Kullanılan Teknolojiler
- <b>Front-end:</b> HTML, CSS, JavaScript
- <b>Back-end:</b> NodeJS, ExpressJS
- <b>Server:</b> MySQL

Uygulamanın daha rahat geliştirilmesi için web ortamı tercih edilmiştir. Bu teknolojiler, Hatırlatıcı Takvim uygulamasının geliştirilmesinde kullanılan temel yapı taşlarıdır. HTML, CSS ve JavaScript ile kullanıcı arayüzü oluşturulurken, Node.js sunucu tarafı uygulamaları geliştirmek için kullanılır. MySQL ise verilerin güvenli ve etkili bir şekilde saklanmasını ve yönetilmesini sağlar.

## Lisans
Bu proje [The GNU General Public License](./LICENSE) altında lisanslanmıştır.
