<?php include "head.php" ?>

<body class="team-page">

  <?php include "header.php" ?>

  <main class="main">

    <!-- Page Title -->
    <div class="page-title" data-aos="fade">
      <div class="container">
        <nav class="breadcrumbs">
          <ol>
            <li><a href="index.html">الرئيسية</a></li>
            <li class="current">الأخبار</li>
          </ol>
        </nav>
        <h1>الأخبار</h1>
      </div>
    </div><!-- End Page Title -->

    <!-- Team Section -->
    <section id="team" class="team news section">

      <div class="container">

        <ul class="filter-section" style="display: flex; gap:40px; justify-content: center; align-items: center; color: #e96b56; list-style: none">
          <li style="cursor: pointer" class="sport">رياضة</li>
          <li style="cursor: pointer" class="economy">اقتصاد</li>
          <li style="cursor: pointer" class="politics">سياسة</li>
        </ul>
        <div class="row gy-4 newsContainer">

        </div>
        <ul class="filter-count-section" style="display: flex; gap:40px; justify-content: center; align-items: center; color: #e96b56; list-style: none">
          <li style="cursor: pointer" class="prev">السابق</li>

          <li style="cursor: pointer" class="next">التالي</li>
        </ul>

      </div>

    </section><!-- /Team Section -->

  </main>

<?php include "footer.php" ?>