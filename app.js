/* S+QDCP Command Center — PT. ALFA VALVES INDONESIA
   Static, offline-friendly dashboard. Data is stored in the browser. */
(() => {
  'use strict';

  const STORAGE_KEY = 'alfa-valves-sqdcp-v1';
  const TODAY = '2026-08-15';
  const CATEGORIES = ['safety', '5s', 'quality', 'delivery', 'cost', 'people'];
  const NS = 'http://www.w3.org/2000/svg';

  const I18N = {
    id: {
      appName: 'S+QDCP Command Center', dashboard: 'Ringkasan Kinerja', dashboardSub: 'Sistem pemantauan operasional terpadu',
      navigation: 'Navigasi', overview: 'Overview', dailyData: 'Data Harian', targets: 'Target KPI', actionPlan: 'Action Plan',
      systemStatus: 'Status sistem', localStorage: 'Penyimpanan lokal', active: 'Aktif', version: 'Versi 1.0 • Offline ready',
      importExcel: 'Impor Excel', exportExcel: 'Unduh Excel', pdf: 'Unduh PDF', theme: 'Ubah tema', menu: 'Buka menu',
      monthlyOverview: 'Overview Bulanan S+QDCP', monthlyDesc: 'Pantau Safety, 5S, Quality, Delivery, Cost, dan People dalam satu tampilan.',
      liveData: 'Data tersimpan otomatis', workingDays: 'Hari kerja', kpiMet: 'KPI sesuai target', atRisk: 'KPI berisiko', completeness: 'Kelengkapan data',
      performanceContour: 'Kontur performa harian', contourDesc: 'Klik angka tanggal untuk membuka data harian.', daily: 'Harian', weekly: 'Mingguan',
      target: 'Target', monthlyActual: 'Aktual bulan ini', met: 'Sesuai target', warning: 'Perlu perhatian', risk: 'Berisiko', noData: 'Belum ada data',
      weekendHoliday: 'Weekend / libur', openData: 'Buka data', latestAction: 'Action plan terbaru', noAction: 'Belum ada action plan',
      dailyTitle: 'Input Data Harian', dailyDesc: 'Isi langsung di web atau impor workbook Excel dengan format yang sama.',
      selectedMonth: 'Periode aktif', clearMonth: 'Clear bulan', downloadTemplate: 'Template Excel', savedAutomatically: 'Perubahan disimpan otomatis di browser ini.',
      date: 'Tanggal', remarks: 'Catatan / Komentar', holiday: 'Libur nasional', weekend: 'Weekend', today: 'Hari ini',
      targetsTitle: 'Target & Kalender', targetsDesc: 'Atur ambang KPI serta hari libur tambahan untuk penandaan merah.',
      primaryMetric: 'Metrik utama', targetValue: 'Nilai target', minimum: 'Minimum', maximum: 'Maksimum',
      directionMin: 'Lebih tinggi lebih baik', directionMax: 'Lebih rendah lebih baik', saved: 'Tersimpan',
      holidayCalendar: 'Kalender Libur', holidayCalendarDesc: 'Libur nasional dan cuti bersama 2026 sudah tersedia.',
      addHoliday: 'Tambah libur', holidayName: 'Nama libur', add: 'Tambah', builtIn: 'Bawaan', custom: 'Kustom',
      usageNotes: 'Cara menggunakan', note1: 'Pilih bulan pada header. Setiap bulan tersimpan sebagai periode terpisah.',
      note2: 'Isi tabel di Data Harian atau impor Excel. Nilai persentase dihitung otomatis.',
      note3: 'Klik Template Excel untuk workbook enam sheet yang siap diisi.',
      note4: 'Data tersimpan lokal. Unduh Excel secara berkala untuk membuat cadangan.',
      actionsTitle: 'Action Plan', actionsDesc: 'Tindak lanjut lintas area dengan pemilik, tenggat, dan status yang jelas.',
      newAction: 'Action baru', edit: 'Ubah', delete: 'Hapus', owner: 'PIC', dueDate: 'Jatuh tempo', status: 'Status', title: 'Judul tindakan', category: 'Kategori',
      open: 'Open', pending: 'Pending', overdue: 'Overdue', done: 'Selesai', cancel: 'Batal', save: 'Simpan',
      confirmClearTitle: 'Clear data bulan ini?', confirmClearDesc: 'Semua data harian pada periode {month} akan dihapus. Target dan action plan tidak berubah.',
      clear: 'Ya, clear data', confirmDeleteTitle: 'Hapus action plan?', confirmDeleteDesc: 'Tindakan ini tidak dapat dibatalkan.',
      importSuccess: '{count} nilai dari {sheets} sheet berhasil diimpor.', importError: 'File tidak dapat dibaca. Gunakan format template dashboard.',
      exportReady: 'File Excel berhasil dibuat.', pdfReady: 'PDF dashboard berhasil dibuat.', pdfWorking: 'Menyiapkan PDF…',
      monthCleared: 'Data periode {month} berhasil dikosongkan.', holidayAdded: 'Hari libur ditambahkan.', holidayRemoved: 'Hari libur dihapus.',
      actionSaved: 'Action plan disimpan.', actionDeleted: 'Action plan dihapus.', invalidHoliday: 'Lengkapi tanggal dan nama hari libur.',
      all: 'Semua', legend: 'Legenda', official2026: 'Kalender resmi 2026', dataAvailable: 'hari terisi',
      safety: 'Safety', fiveS: '5S', quality: 'Quality', delivery: 'Delivery', cost: 'Cost', people: 'People',
      accidents: 'Jumlah kecelakaan', compliance5s: 'Kepatuhan audit 5S', ftp: 'First Time Pass', deliveryOutput: 'Output pengiriman',
      extraHours: 'Total extra hours', attendance: 'Total kehadiran', values: 'nilai', percent: '%', hours: 'jam', cases: 'kasus',
      nearMiss: 'Near Miss Incident', accident: 'Accident', assembly: '5S – Assembly Zone', testingZone: '5S – Testing Zone',
      warehouse: '5S – Warehouse Zone', machining: '5S – Machining Zone', otherAreas: '5S – Other Areas',
      valvesOk: 'Valves OK', valvesTested: 'Valves Tested', customerComplaints: 'Jumlah keluhan pelanggan', valvesAffected: 'Valve terdampak',
      plannedTesting: 'Valves Planned for Testing', testingOutput: 'Testing Output %', plannedPainting: 'Valves Planned for Blasting / Painting',
      valvesPainted: 'Valves Blasted / Painted', paintingOutput: 'Painting Output %', permanentEmployees: 'Karyawan permanen',
      permanentHours: 'Jam tersedia – permanen', contractEmployees: 'Karyawan kontrak', contractHours: 'Jam tersedia – kontrak',
      idleHours: 'Idle Hours (A)', overtimeHours: 'Overtime Hours (B)', reworkHours: 'Rework Hours (C)', retestingHours: 'Re-Testing Hours (D)',
      totalExtraHours: 'Total Extra Hours (A+B+C+D)', permanentStrength: 'Total karyawan permanen', employeesPresent: 'Karyawan hadir',
      permanentAttendance: 'Kehadiran permanen %', contractStrength: 'Total karyawan kontrak', contractPresent: 'Karyawan kontrak hadir',
      contractAttendance: 'Kehadiran kontrak %', totalAttendance: 'Total Attendance %', chooseFile: 'Pilih file Excel',
      statusData: 'Status data', working: 'Hari kerja', nonWorking: 'Hari nonkerja', record: 'rekaman', deleteHoliday: 'Hapus libur'
    },
    en: {
      appName: 'S+QDCP Command Center', dashboard: 'Performance Summary', dashboardSub: 'Integrated operational monitoring system',
      navigation: 'Navigation', overview: 'Overview', dailyData: 'Daily Data', targets: 'KPI Targets', actionPlan: 'Action Plan',
      systemStatus: 'System status', localStorage: 'Local storage', active: 'Active', version: 'Version 1.0 • Offline ready',
      importExcel: 'Import Excel', exportExcel: 'Download Excel', pdf: 'Download PDF', theme: 'Switch theme', menu: 'Open menu',
      monthlyOverview: 'Monthly S+QDCP Overview', monthlyDesc: 'Monitor Safety, 5S, Quality, Delivery, Cost, and People in one view.',
      liveData: 'Auto-saved data', workingDays: 'Working days', kpiMet: 'KPIs on target', atRisk: 'KPIs at risk', completeness: 'Data completeness',
      performanceContour: 'Daily performance contours', contourDesc: 'Click a date number to open its daily data.', daily: 'Daily', weekly: 'Weekly',
      target: 'Target', monthlyActual: 'Actual this month', met: 'On target', warning: 'Needs attention', risk: 'At risk', noData: 'No data yet',
      weekendHoliday: 'Weekend / holiday', openData: 'Open data', latestAction: 'Latest action plan', noAction: 'No action plan yet',
      dailyTitle: 'Daily Data Entry', dailyDesc: 'Enter data directly on the web or import an Excel workbook in the same format.',
      selectedMonth: 'Active period', clearMonth: 'Clear month', downloadTemplate: 'Excel Template', savedAutomatically: 'Changes are automatically saved in this browser.',
      date: 'Date', remarks: 'Remarks / Comments', holiday: 'National holiday', weekend: 'Weekend', today: 'Today',
      targetsTitle: 'Targets & Calendar', targetsDesc: 'Set KPI thresholds and additional holidays for red-day markers.',
      primaryMetric: 'Primary metric', targetValue: 'Target value', minimum: 'Minimum', maximum: 'Maximum',
      directionMin: 'Higher is better', directionMax: 'Lower is better', saved: 'Saved',
      holidayCalendar: 'Holiday Calendar', holidayCalendarDesc: '2026 national holidays and collective leave are included.',
      addHoliday: 'Add holiday', holidayName: 'Holiday name', add: 'Add', builtIn: 'Built-in', custom: 'Custom',
      usageNotes: 'How to use', note1: 'Select a month in the header. Each month is stored as a separate period.',
      note2: 'Fill the Daily Data table or import Excel. Percentage values are calculated automatically.',
      note3: 'Click Excel Template for a ready-to-use six-sheet workbook.',
      note4: 'Data is stored locally. Download Excel periodically to keep a backup.',
      actionsTitle: 'Action Plan', actionsDesc: 'Cross-functional follow-up with a clear owner, due date, and status.',
      newAction: 'New action', edit: 'Edit', delete: 'Delete', owner: 'Owner', dueDate: 'Due date', status: 'Status', title: 'Action title', category: 'Category',
      open: 'Open', pending: 'Pending', overdue: 'Overdue', done: 'Done', cancel: 'Cancel', save: 'Save',
      confirmClearTitle: 'Clear this month’s data?', confirmClearDesc: 'All daily data for {month} will be removed. Targets and action plans remain unchanged.',
      clear: 'Yes, clear data', confirmDeleteTitle: 'Delete action plan?', confirmDeleteDesc: 'This action cannot be undone.',
      importSuccess: '{count} values from {sheets} sheets were imported.', importError: 'The file could not be read. Please use the dashboard template.',
      exportReady: 'Excel file created.', pdfReady: 'Dashboard PDF created.', pdfWorking: 'Preparing PDF…',
      monthCleared: '{month} data has been cleared.', holidayAdded: 'Holiday added.', holidayRemoved: 'Holiday removed.',
      actionSaved: 'Action plan saved.', actionDeleted: 'Action plan deleted.', invalidHoliday: 'Enter a holiday date and name.',
      all: 'All', legend: 'Legend', official2026: 'Official 2026 calendar', dataAvailable: 'days filled',
      safety: 'Safety', fiveS: '5S', quality: 'Quality', delivery: 'Delivery', cost: 'Cost', people: 'People',
      accidents: 'Number of accidents', compliance5s: '5S audit compliance', ftp: 'First Time Pass', deliveryOutput: 'Delivery output',
      extraHours: 'Total extra hours', attendance: 'Total attendance', values: 'values', percent: '%', hours: 'hours', cases: 'cases',
      nearMiss: 'Near Miss Incident', accident: 'Accident', assembly: '5S – Assembly Zone', testingZone: '5S – Testing Zone',
      warehouse: '5S – Warehouse Zone', machining: '5S – Machining Zone', otherAreas: '5S – Other Areas',
      valvesOk: 'Valves OK', valvesTested: 'Valves Tested', customerComplaints: 'No. of Customer Complaints', valvesAffected: 'Valves Affected',
      plannedTesting: 'Valves Planned for Testing', testingOutput: 'Testing Output %', plannedPainting: 'Valves Planned for Blasting / Painting',
      valvesPainted: 'Valves Blasted / Painted', paintingOutput: 'Painting Output %', permanentEmployees: 'Permanent Employees',
      permanentHours: 'Available Hours – Permanent', contractEmployees: 'Contract Employees', contractHours: 'Available Hours – Contract',
      idleHours: 'Idle Hours (A)', overtimeHours: 'Overtime Hours (B)', reworkHours: 'Rework Hours (C)', retestingHours: 'Re-Testing Hours (D)',
      totalExtraHours: 'Total Extra Hours (A+B+C+D)', permanentStrength: 'Total Permanent Employee Strength', employeesPresent: 'Employees Present',
      permanentAttendance: 'Permanent Attendance %', contractStrength: 'Total Contract Employee Strength', contractPresent: 'Contract Employees Present',
      contractAttendance: 'Contract Attendance %', totalAttendance: 'Total Attendance %', chooseFile: 'Choose Excel file',
      statusData: 'Data status', working: 'Working day', nonWorking: 'Non-working day', record: 'records', deleteHoliday: 'Delete holiday'
    }
  };

  const CONFIG = {
    safety: { name:'safety', letter:'S', metric:'accidents', unit:'cases', direction:'max', accent:'#20b883', columns:[
      {key:'nearMiss', label:'nearMiss', type:'number'}, {key:'accident',label:'accident',type:'number'}, {key:'remarks',label:'remarks',type:'text'} ] },
    '5s': { name:'fiveS', letter:'5', metric:'compliance5s', unit:'percent', direction:'min', accent:'#20a3a7', columns:[
      {key:'assembly',label:'assembly',type:'boolean'}, {key:'testing',label:'testingZone',type:'boolean'}, {key:'warehouse',label:'warehouse',type:'boolean'},
      {key:'machining',label:'machining',type:'boolean'}, {key:'other',label:'otherAreas',type:'boolean'}, {key:'remarks',label:'remarks',type:'text'} ] },
    quality: { name:'quality', letter:'Q', metric:'ftp', unit:'percent', direction:'min', accent:'#279bc9', columns:[
      {key:'valvesOk',label:'valvesOk',type:'number'}, {key:'valvesTested',label:'valvesTested',type:'number'}, {key:'ftp',label:'ftp',type:'computed'},
      {key:'complaints',label:'customerComplaints',type:'number'}, {key:'valvesAffected',label:'valvesAffected',type:'number'}, {key:'remarks',label:'remarks',type:'text'} ] },
    delivery: { name:'delivery', letter:'D', metric:'deliveryOutput', unit:'percent', direction:'min', accent:'#2c70b6', columns:[
      {key:'plannedTesting',label:'plannedTesting',type:'number'}, {key:'valvesTested',label:'valvesTested',type:'number'}, {key:'testingOutput',label:'testingOutput',type:'computed'},
      {key:'plannedPainting',label:'plannedPainting',type:'number'}, {key:'valvesPainted',label:'valvesPainted',type:'number'}, {key:'paintingOutput',label:'paintingOutput',type:'computed'},
      {key:'remarks',label:'remarks',type:'text'} ] },
    cost: { name:'cost', letter:'C', metric:'extraHours', unit:'hours', direction:'max', accent:'#ed9b25', columns:[
      {key:'permanentEmployees',label:'permanentEmployees',type:'number'}, {key:'permanentHours',label:'permanentHours',type:'number'},
      {key:'contractEmployees',label:'contractEmployees',type:'number'}, {key:'contractHours',label:'contractHours',type:'number'},
      {key:'idleHours',label:'idleHours',type:'number'}, {key:'overtimeHours',label:'overtimeHours',type:'number'},
      {key:'reworkHours',label:'reworkHours',type:'number'}, {key:'retestingHours',label:'retestingHours',type:'number'},
      {key:'totalExtraHours',label:'totalExtraHours',type:'computed'}, {key:'remarks',label:'remarks',type:'text'} ] },
    people: { name:'people', letter:'P', metric:'attendance', unit:'percent', direction:'min', accent:'#735acf', columns:[
      {key:'permanentStrength',label:'permanentStrength',type:'number'}, {key:'permanentPresent',label:'employeesPresent',type:'number'},
      {key:'permanentAttendance',label:'permanentAttendance',type:'computed'}, {key:'contractStrength',label:'contractStrength',type:'number'},
      {key:'contractPresent',label:'contractPresent',type:'number'}, {key:'contractAttendance',label:'contractAttendance',type:'computed'},
      {key:'totalAttendance',label:'totalAttendance',type:'computed'}, {key:'remarks',label:'remarks',type:'text'} ] }
  };

  const LETTER_PATHS = {
    safety: 'M224 48 C174 21 67 26 45 86 C25 141 77 157 137 162 C199 167 231 185 222 231 C210 289 91 292 40 257',
    '5s': 'M220 43 L73 43 L54 145 C88 126 172 126 205 159 C241 195 220 263 165 278 C112 292 65 273 41 245',
    quality: 'M224 151 C224 222 184 270 133 270 C75 270 39 220 39 151 C39 80 78 33 134 33 C190 33 224 80 224 151 Z M174 217 L237 276',
    delivery: 'M55 36 L55 267 M55 36 C158 34 224 72 224 151 C224 225 166 267 55 267',
    cost: 'M224 64 C198 39 173 31 137 31 C75 31 40 78 40 151 C40 225 76 273 139 273 C175 273 202 262 224 238',
    people: 'M60 273 L60 35 L139 35 C198 35 225 69 225 119 C225 170 190 194 60 194'
  };

  const BUILTIN_HOLIDAYS = {
    '2026-01-01': ['Tahun Baru 2026 Masehi','New Year’s Day 2026'],
    '2026-01-16': ['Isra Mikraj Nabi Muhammad SAW','Isra Mi’raj'],
    '2026-02-16': ['Cuti Bersama Imlek','Chinese New Year Collective Leave'],
    '2026-02-17': ['Tahun Baru Imlek 2577 Kongzili','Chinese New Year 2577'],
    '2026-03-18': ['Cuti Bersama Nyepi','Nyepi Collective Leave'],
    '2026-03-19': ['Hari Suci Nyepi','Nyepi'],
    '2026-03-20': ['Cuti Bersama Idulfitri','Eid al-Fitr Collective Leave'],
    '2026-03-21': ['Idulfitri 1447 H','Eid al-Fitr 1447 H'],
    '2026-03-22': ['Idulfitri 1447 H','Eid al-Fitr 1447 H'],
    '2026-03-23': ['Cuti Bersama Idulfitri','Eid al-Fitr Collective Leave'],
    '2026-03-24': ['Cuti Bersama Idulfitri','Eid al-Fitr Collective Leave'],
    '2026-04-03': ['Wafat Yesus Kristus','Good Friday'],
    '2026-04-05': ['Kebangkitan Yesus Kristus','Easter Sunday'],
    '2026-05-01': ['Hari Buruh Internasional','International Labour Day'],
    '2026-05-14': ['Kenaikan Yesus Kristus','Ascension Day'],
    '2026-05-15': ['Cuti Bersama Kenaikan Yesus Kristus','Ascension Collective Leave'],
    '2026-05-27': ['Iduladha 1447 H','Eid al-Adha 1447 H'],
    '2026-05-28': ['Cuti Bersama Iduladha','Eid al-Adha Collective Leave'],
    '2026-05-31': ['Hari Raya Waisak 2570 BE','Vesak Day 2570 BE'],
    '2026-06-01': ['Hari Lahir Pancasila','Pancasila Day'],
    '2026-06-16': ['Tahun Baru Islam 1448 H','Islamic New Year 1448 H'],
    '2026-08-17': ['Hari Kemerdekaan Republik Indonesia','Indonesian Independence Day'],
    '2026-08-25': ['Maulid Nabi Muhammad SAW','Prophet Muhammad’s Birthday'],
    '2026-12-24': ['Cuti Bersama Natal','Christmas Collective Leave'],
    '2026-12-25': ['Hari Raya Natal','Christmas Day']
  };

  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
  const esc = (v='') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const tr = (key, vars={}) => {
    let s = (I18N[state?.language || 'id'] || I18N.id)[key] ?? I18N.id[key] ?? key;
    Object.entries(vars).forEach(([k,v]) => s = s.replaceAll(`{${k}}`, v));
    return s;
  };
  const pad = n => String(n).padStart(2,'0');
  const monthDays = month => { const [y,m] = month.split('-').map(Number); return new Date(y,m,0).getDate(); };
  const dateObj = (month, day) => { const [y,m] = month.split('-').map(Number); return new Date(y,m-1,day); };
  const isoDate = (month, day) => `${month}-${pad(day)}`;
  const monthLabel = month => new Intl.DateTimeFormat(state.language === 'id' ? 'id-ID':'en-GB',{month:'long',year:'numeric'}).format(dateObj(month,1));
  const shortDate = (month,day) => new Intl.DateTimeFormat(state.language === 'id' ? 'id-ID':'en-GB',{day:'numeric',month:'short',year:'numeric'}).format(dateObj(month,day));
  const dayName = (month,day) => new Intl.DateTimeFormat(state.language === 'id' ? 'id-ID':'en-GB',{weekday:'short'}).format(dateObj(month,day));
  const pct = (a,b,zeroAsHundred=false) => b > 0 ? a/b*100 : (zeroAsHundred && a === 0 && b === 0 ? 100 : null);
  const sum = arr => arr.reduce((a,b)=>a+(Number(b)||0),0);
  const hasOwn = (o,k) => Object.prototype.hasOwnProperty.call(o || {},k);
  const icon = name => {
    const paths = {
      overview:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      data:'<path d="M4 5h16M4 12h16M4 19h16M8 3v18"/>', target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v3M22 12h-3M12 22v-3M2 12h3"/>',
      actions:'<path d="M8 5h11M8 12h11M8 19h11"/><path d="m3 5 1 1 2-2M3 12l1 1 2-2M3 19l1 1 2-2"/>',
      upload:'<path d="M12 16V4m0 0L7 9m5-5 5 5"/><path d="M4 15v5h16v-5"/>', download:'<path d="M12 4v12m0 0 5-5m-5 5-5-5"/><path d="M4 20h16"/>',
      pdf:'<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M8 16h8M8 12h5"/>', sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
      moon:'<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5z"/>', menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
      calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>', clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>', alert:'<path d="M12 3 2.8 20h18.4z"/><path d="M12 9v5M12 17h.01"/>',
      database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/>',
      plus:'<path d="M12 5v14M5 12h14"/>', trash:'<path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/>', edit:'<path d="m4 16-1 5 5-1L19 9l-4-4zM13 7l4 4"/>',
      chevron:'<path d="m9 18 6-6-6-6"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.info}</svg>`;
  };

  function createInitialState() {
    const s = {
      language:'id', theme:'light', month:'2026-08', activeView:'overview', activeCategory:'safety', overviewPeriod:'daily',
      targets:{ safety:0, '5s':100, quality:95, delivery:95, cost:24, people:95 }, months:{}, customHolidays:{}, actions:[]
    };
    seedDemo(s);
    return s;
  }

  function seedDemo(s) {
    const m = '2026-08';
    s.months[m] = {safety:{},'5s':{},quality:{},delivery:{},cost:{},people:{}};
    const put = (cat, day, rec) => s.months[m][cat][day] = rec;
    [1,3,4,5,6,7].forEach(d => put('5s',d,{assembly:true,testing:true,warehouse:true,machining:true,other:true}));
    put('safety',1,{nearMiss:0,accident:0}); put('safety',3,{nearMiss:0,accident:1,remarks:'Tangan operator terkena tools saat pengencangan nipple; terjadi abrasi ringan.'});
    [4,5,6,7].forEach(d=>put('safety',d,{nearMiss:0,accident:0}));
    put('quality',1,{valvesOk:39,valvesTested:42,complaints:0,valvesAffected:0});
    put('quality',3,{valvesOk:17,valvesTested:17,complaints:0,valvesAffected:0,remarks:'Witness Inspection SO.002 (Denson), SO.012 & 013 (Atamora)'});
    put('quality',4,{valvesOk:0,valvesTested:0,complaints:0,valvesAffected:0}); put('quality',5,{valvesOk:0,valvesTested:0,complaints:0,valvesAffected:0});
    put('quality',6,{valvesOk:6,valvesTested:6,complaints:0,valvesAffected:0,remarks:'Re-testing after Repair SO.004'});
    put('quality',7,{valvesOk:6,valvesTested:6,complaints:0,valvesAffected:0,remarks:'Witness Inspection SO.014 (BSM)'});
    put('delivery',1,{plannedTesting:42,valvesTested:39,plannedPainting:15,valvesPainted:15});
    [[3,17,17,15,15],[4,23,23,15,15],[5,0,0,7,7],[6,0,0,2,2],[7,4,4,3,3]].forEach(r=>put('delivery',r[0],{plannedTesting:r[1],valvesTested:r[2],plannedPainting:r[3],valvesPainted:r[4]}));
    put('cost',1,{permanentEmployees:6,permanentHours:48,contractEmployees:9,contractHours:72,idleHours:0,overtimeHours:120,reworkHours:24,retestingHours:0,remarks:''});
    put('cost',3,{permanentEmployees:7,permanentHours:56,contractEmployees:11,contractHours:88,idleHours:0,overtimeHours:0,reworkHours:12,retestingHours:0,remarks:'Repair Leak Gate SO.004'});
    put('cost',4,{permanentEmployees:7,permanentHours:56,contractEmployees:12,contractHours:96,idleHours:0,overtimeHours:0,reworkHours:12,retestingHours:0,remarks:'Repair Leak Gate SO.004'});
    put('cost',5,{permanentEmployees:7,permanentHours:56,contractEmployees:12,contractHours:96,idleHours:0,overtimeHours:0,reworkHours:12,retestingHours:0,remarks:'Repair Leak Gate SO.004'});
    put('cost',6,{permanentEmployees:7,permanentHours:56,contractEmployees:11,contractHours:88,idleHours:0,overtimeHours:0,reworkHours:0,retestingHours:8,remarks:'Re-Testing SO.004'});
    put('cost',7,{permanentEmployees:7,permanentHours:56,contractEmployees:12,contractHours:96,idleHours:0,overtimeHours:0,reworkHours:24,retestingHours:0,remarks:'Final Touchup Painting'});
    put('people',1,{permanentStrength:7,permanentPresent:6,contractStrength:12,contractPresent:9});
    [[3,7,7,12,11],[4,7,7,12,12],[5,7,7,12,12],[6,7,7,12,11],[7,7,7,12,12]].forEach(r=>put('people',r[0],{permanentStrength:r[1],permanentPresent:r[2],contractStrength:r[3],contractPresent:r[4]}));
    s.actions = [
      {id:'a1',category:'safety',title:'Investigasi insiden abrasi & refresh briefing',owner:'HSE',dueDate:'2026-08-05',status:'open'},
      {id:'a2',category:'5s',title:'Audit silang area testing dan machining',owner:'GA Team',dueDate:'2026-08-14',status:'pending'},
      {id:'a3',category:'quality',title:'Review first time pass SO.002',owner:'QC Team',dueDate:'2026-08-12',status:'open'},
      {id:'a4',category:'delivery',title:'Recovery plan backlog testing',owner:'Production',dueDate:'2026-08-18',status:'open'},
      {id:'a5',category:'cost',title:'Analisis overtime dan rework',owner:'Operations',dueDate:'2026-08-10',status:'pending'},
      {id:'a6',category:'people',title:'Follow-up kehadiran tenaga kontrak',owner:'HRGA',dueDate:'2026-08-20',status:'open'}
    ];
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createInitialState();
      const saved = JSON.parse(raw), base = createInitialState();
      return {...base,...saved,targets:{...base.targets,...saved.targets},months:saved.months||base.months,actions:saved.actions||base.actions,customHolidays:saved.customHolidays||{}};
    } catch { return createInitialState(); }
  }
  let state = loadState();
  const saveState = () => { try { localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); } catch {} };
  const ensureMonth = (month=state.month) => {
    if (!state.months[month]) state.months[month] = {};
    CATEGORIES.forEach(c => { if (!state.months[month][c]) state.months[month][c] = {}; });
    return state.months[month];
  };

  function holidayInfo(month, day) {
    const iso = isoDate(month,day), d = dateObj(month,day), weekend = d.getDay()===0 || d.getDay()===6;
    const built = BUILTIN_HOLIDAYS[iso], custom = state.customHolidays[iso];
    return { weekend, holiday:!!(built||custom), name: custom || (built ? built[state.language==='id'?0:1] : ''), nonwork:weekend||!!built||!!custom, builtIn:!!built };
  }
  function recordHasData(cat, rec) {
    if (!rec) return false;
    return CONFIG[cat].columns.some(c => c.type!=='computed' && hasOwn(rec,c.key) && rec[c.key] !== '' && rec[c.key] !== null && rec[c.key] !== undefined);
  }
  function computed(cat, key, rec={}) {
    if (cat==='quality' && key==='ftp') return pct(Number(rec.valvesOk)||0,Number(rec.valvesTested)||0,hasOwn(rec,'valvesTested'));
    if (cat==='delivery' && key==='testingOutput') return pct(Number(rec.valvesTested)||0,Number(rec.plannedTesting)||0,hasOwn(rec,'plannedTesting'));
    if (cat==='delivery' && key==='paintingOutput') return pct(Number(rec.valvesPainted)||0,Number(rec.plannedPainting)||0,hasOwn(rec,'plannedPainting'));
    if (cat==='cost' && key==='totalExtraHours') return sum(['idleHours','overtimeHours','reworkHours','retestingHours'].map(k=>rec[k]));
    if (cat==='people' && key==='permanentAttendance') return pct(Number(rec.permanentPresent)||0,Number(rec.permanentStrength)||0,false);
    if (cat==='people' && key==='contractAttendance') return pct(Number(rec.contractPresent)||0,Number(rec.contractStrength)||0,false);
    if (cat==='people' && key==='totalAttendance') return pct((Number(rec.permanentPresent)||0)+(Number(rec.contractPresent)||0),(Number(rec.permanentStrength)||0)+(Number(rec.contractStrength)||0),false);
    return null;
  }
  function dailyMetric(cat,rec) {
    if (!recordHasData(cat,rec)) return null;
    if (cat==='safety') return Number(rec.accident)||0;
    if (cat==='5s') return ['assembly','testing','warehouse','machining','other'].filter(k=>rec[k]===true || rec[k]===1 || rec[k]==='1' || rec[k]==='√').length / 5 * 100;
    if (cat==='quality') return computed(cat,'ftp',rec);
    if (cat==='delivery') {
      const vals = [computed(cat,'testingOutput',rec),computed(cat,'paintingOutput',rec)].filter(v=>v!==null);
      return vals.length ? sum(vals)/vals.length : null;
    }
    if (cat==='cost') return computed(cat,'totalExtraHours',rec);
    if (cat==='people') return computed(cat,'totalAttendance',rec);
    return null;
  }
  function statusFor(cat,value) {
    if (value===null || value===undefined || Number.isNaN(value)) return 'blank';
    const target = Number(state.targets[cat]), dir=CONFIG[cat].direction;
    if (dir==='min') {
      if (value>=target) return 'met';
      return value>=target*.9 ? 'warning':'risk';
    }
    if (target===0) return value<=0 ? 'met':'risk';
    if (value<=target) return 'met';
    return value<=target*1.2 ? 'warning':'risk';
  }
  function aggregateMetric(cat) {
    const rows = ensureMonth()[cat], recs = Object.values(rows).filter(r=>recordHasData(cat,r));
    if (!recs.length) return null;
    if (cat==='safety') return sum(recs.map(r=>r.accident));
    if (cat==='5s') return sum(recs.map(r=>dailyMetric(cat,r)))/recs.length;
    if (cat==='quality') return pct(sum(recs.map(r=>r.valvesOk)),sum(recs.map(r=>r.valvesTested)),false);
    if (cat==='delivery') {
      const a=pct(sum(recs.map(r=>r.valvesTested)),sum(recs.map(r=>r.plannedTesting)),false);
      const b=pct(sum(recs.map(r=>r.valvesPainted)),sum(recs.map(r=>r.plannedPainting)),false);
      const vals=[a,b].filter(v=>v!==null); return vals.length?sum(vals)/vals.length:null;
    }
    if (cat==='cost') return sum(recs.map(r=>computed(cat,'totalExtraHours',r)));
    if (cat==='people') return pct(sum(recs.map(r=>(Number(r.permanentPresent)||0)+(Number(r.contractPresent)||0))),sum(recs.map(r=>(Number(r.permanentStrength)||0)+(Number(r.contractStrength)||0))),false);
    return null;
  }
  function formatValue(cat,value,compact=false) {
    if (value===null || value===undefined || Number.isNaN(value)) return '—';
    const unit=CONFIG[cat].unit;
    const n = unit==='percent' ? `${Math.round(value)}%` : Number.isInteger(value) ? value.toLocaleString(state.language==='id'?'id-ID':'en-US') : value.toFixed(1);
    if (compact || unit==='percent') return String(n);
    return `${n} ${tr(unit)}`;
  }
  function statusLabel(st) { return tr(st==='blank'?'noData':st); }
  function actionStatus(a) { return a.status!=='done' && a.dueDate && a.dueDate<TODAY ? 'overdue' : a.status; }

  function renderShell() {
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.lang = state.language;
    document.title = `${tr('appName')} — PT. ALFA VALVES INDONESIA`;
    const nav = [
      ['overview','overview','overview'],['daily','data','dailyData'],['targets','target','targets'],['actions','actions','actionPlan']
    ];
    $('#app').innerHTML = `<div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <div class="brand"><div class="brand-mark">AV</div><div class="brand-name">PT. ALFA VALVES<br>INDONESIA<small>S+QDCP Command Center</small></div></div>
        <div class="nav-label">${tr('navigation')}</div>
        <ul class="nav-list">${nav.map(n=>`<li><button class="nav-btn ${state.activeView===n[0]?'active':''}" data-action="navigate" data-view="${n[0]}">${icon(n[1])}<span class="nav-text">${tr(n[2])}</span></button></li>`).join('')}</ul>
        <div class="sidebar-status"><div class="sidebar-status-title">${tr('systemStatus')}</div><div class="status-mini"><span><i class="status-dot"></i>${tr('localStorage')}</span><strong>${tr('active')}</strong></div><div class="status-mini"><span>${monthLabel(state.month)}</span><strong>${filledDays()} ${tr('record')}</strong></div></div>
        <div class="sidebar-footer">${tr('version')}<br>© 2026 PT. ALFA VALVES INDONESIA</div>
      </aside>
      <main class="main-shell">
        <header class="topbar no-export">
          <button class="icon-btn mobile-menu" data-action="toggle-menu" title="${tr('menu')}">${icon('menu')}</button>
          <div class="page-heading"><h1>${viewTitle()}</h1><p>${tr('dashboardSub')}</p></div>
          <div class="toolbar">
            <label class="control month-control" title="${tr('selectedMonth')}">${icon('calendar')}<span>${tr('selectedMonth')}</span><input id="monthPicker" type="month" value="${state.month}" min="2024-01" max="2035-12"></label>
            <div class="lang-toggle"><button data-action="language" data-lang="id" class="${state.language==='id'?'active':''}">ID</button><button data-action="language" data-lang="en" class="${state.language==='en'?'active':''}">EN</button></div>
            <button class="icon-btn" data-action="theme" title="${tr('theme')}">${icon(state.theme==='dark'?'sun':'moon')}</button>
            <button class="btn hide-medium" data-action="import" title="${tr('importExcel')}">${icon('upload')}<span>${tr('importExcel')}</span></button>
            <button class="btn btn-primary" data-action="pdf" title="${tr('pdf')}">${icon('pdf')}<span>${tr('pdf')}</span></button>
          </div>
        </header>
        <div class="page-content" id="pageContent">${renderView()}</div>
      </main>
      <nav class="mobile-nav">${nav.map(n=>`<button class="${state.activeView===n[0]?'active':''}" data-action="navigate" data-view="${n[0]}">${icon(n[1])}<span>${tr(n[2])}</span></button>`).join('')}</nav>
    </div>`;
    if (state.activeView==='overview') requestAnimationFrame(hydrateLetterNodes);
  }
  function viewTitle() { return tr({overview:'dashboard',daily:'dailyData',targets:'targets',actions:'actionPlan'}[state.activeView]||'dashboard'); }
  function renderView() { if(state.activeView==='daily')return renderDaily(); if(state.activeView==='targets')return renderTargets(); if(state.activeView==='actions')return renderActions(); return renderOverview(); }
  function filledDays() {
    const month=ensureMonth(), set=new Set();
    CATEGORIES.forEach(c=>Object.entries(month[c]).forEach(([d,r])=>{if(recordHasData(c,r))set.add(d);})); return set.size;
  }

  function summaryStats() {
    const days=monthDays(state.month); let working=0,met=0,risk=0,total=0;
    for(let d=1;d<=days;d++) if(!holidayInfo(state.month,d).nonwork){ working++; CATEGORIES.forEach(c=>{const v=dailyMetric(c,ensureMonth()[c][d]); if(v!==null){total++;const s=statusFor(c,v);if(s==='met')met++;if(s==='risk')risk++;}}); }
    const completeness = working ? Math.round(total/(working*CATEGORIES.length)*100) : 0;
    return {working,met,risk,completeness};
  }
  function renderOverview() {
    const stats=summaryStats();
    return `<section id="overviewCapture">
      <div class="dashboard-intro"><div><div class="kpi-eyebrow" style="color:var(--teal)">PT. ALFA VALVES INDONESIA</div><h2>${tr('monthlyOverview')}</h2><p>${tr('monthlyDesc')} <strong>${monthLabel(state.month)}</strong></p></div><span class="live-pill">${tr('liveData')}</span></div>
      <div class="summary-grid">
        ${summaryCard('calendar',stats.working,tr('workingDays'))}${summaryCard('check',stats.met,tr('kpiMet'))}${summaryCard('alert',stats.risk,tr('atRisk'))}${summaryCard('database',`${stats.completeness}%`,tr('completeness'))}
      </div>
      <div class="overview-toolbar"><div><h3 class="section-title">${tr('performanceContour')}</h3><div class="section-subtitle">${tr('contourDesc')}</div></div><div class="segmented no-export"><button data-action="period" data-period="daily" class="${state.overviewPeriod==='daily'?'active':''}">${tr('daily')}</button><button data-action="period" data-period="weekly" class="${state.overviewPeriod==='weekly'?'active':''}">${tr('weekly')}</button></div></div>
      <div class="kpi-grid">${CATEGORIES.map(renderKpiCard).join('')}</div>
      <div class="legend"><strong>${tr('legend')}:</strong><span class="l-met">${tr('met')}</span><span class="l-warning">${tr('warning')}</span><span class="l-risk">${tr('risk')}</span><span class="l-empty">${tr('noData')}</span><span class="l-off">${tr('weekendHoliday')}</span></div>
    </section>`;
  }
  function summaryCard(ic,value,label){return `<div class="summary-card"><div class="summary-icon">${icon(ic)}</div><div><span class="summary-value">${value}</span><span class="summary-label">${label}</span></div></div>`;}
  function renderKpiCard(cat) {
    const cfg=CONFIG[cat], actual=aggregateMetric(cat), st=statusFor(cat,actual), target=formatValue(cat,Number(state.targets[cat]),true), action=state.actions.filter(a=>a.category===cat).sort((a,b)=>(a.dueDate||'').localeCompare(b.dueDate||''))[0];
    const filled=Object.values(ensureMonth()[cat]).filter(r=>recordHasData(cat,r)).length;
    return `<article class="kpi-card kpi-${cat}">
      <div class="kpi-visual"><div class="kpi-head"><div><div class="kpi-eyebrow">${tr('statusData')} • ${filled} ${tr('dataAvailable')}</div><h3 class="kpi-title">${tr(cfg.name)}</h3></div><div class="kpi-score"><strong>${formatValue(cat,actual,true)}</strong><span>${tr('monthlyActual')}</span></div></div>
        <svg class="letter-svg" data-category="${cat}" viewBox="0 0 270 300" role="img" aria-label="${esc(tr(cfg.name))} ${esc(monthLabel(state.month))}"><path class="letter-guide" d="${LETTER_PATHS[cat]}"></path><g class="date-nodes"></g></svg>
      </div>
      <div class="kpi-body"><div class="metric-row"><div><div class="metric-name">${tr(cfg.metric)}</div><div class="metric-target">${tr('target')} ${cfg.direction==='min'?'≥':'≤'} ${target}</div></div><span class="metric-status status-${st}">${statusLabel(st)}</span></div>
        <div class="spark-wrap">${sparkline(cat)}</div>
        <div class="action-preview"><div class="action-preview-title"><small>${tr('latestAction')}</small><strong>${action?esc(action.title):tr('noAction')}</strong></div>${action?`<span class="action-badge action-${actionStatus(action)}">${tr(actionStatus(action))}</span>`:`<button class="mini-btn no-export" data-action="new-action" data-category="${cat}" title="${tr('newAction')}">${icon('plus')}</button>`}</div>
      </div></article>`;
  }
  function sparkline(cat) {
    let values=[]; const days=monthDays(state.month);
    if(state.overviewPeriod==='weekly'){
      for(let w=0;w<5;w++){const vals=[];for(let d=w*7+1;d<=Math.min(days,w*7+7);d++){const v=dailyMetric(cat,ensureMonth()[cat][d]);if(v!==null)vals.push(v);}values.push(vals.length?sum(vals)/vals.length:null);}
    } else for(let d=1;d<=days;d++) values.push(dailyMetric(cat,ensureMonth()[cat][d]));
    const target=Number(state.targets[cat]), valid=values.filter(v=>v!==null), max=Math.max(target, ...valid, CONFIG[cat].unit==='percent'?100:1), min=0;
    const W=300,H=70,padX=8,padY=8, x=i=>padX+(values.length===1?0:i*(W-padX*2)/(values.length-1)), y=v=>H-padY-(v-min)/(max-min||1)*(H-padY*2);
    let path='', points=''; values.forEach((v,i)=>{if(v===null)return; const prev=i>0?values[i-1]:null;path+=`${prev===null?'M':'L'}${x(i).toFixed(1)},${y(v).toFixed(1)} `;points+=`<circle class="spark-point" cx="${x(i)}" cy="${y(v)}" r="2.5"/>`;});
    const labels=state.overviewPeriod==='weekly'?values.map((_,i)=>`W${i+1}`):[1,8,15,22,days];
    return `<svg class="spark-svg" viewBox="0 0 300 80" preserveAspectRatio="none"><path class="spark-grid" d="M8 35H292M8 62H292"/><path class="spark-target" d="M8 ${y(target)}H292"/><path class="spark-line" d="${path}"/>${points}${labels.map((l,i)=>{const xx=state.overviewPeriod==='weekly'?x(i):x(Math.min(values.length-1,l-1));return `<text class="spark-label" x="${xx}" y="78" text-anchor="middle">${l}</text>`;}).join('')}</svg>`;
  }
  function hydrateLetterNodes() {
    $$('.letter-svg').forEach(svg=>{
      const cat=svg.dataset.category,path=$('.letter-guide',svg),group=$('.date-nodes',svg); if(!path||!group)return;
      const len=path.getTotalLength(),days=monthDays(state.month);
      for(let d=1;d<=days;d++){
        const p=path.getPointAtLength(len*((d-.5)/days)), info=holidayInfo(state.month,d), value=dailyMetric(cat,ensureMonth()[cat][d]), st=statusFor(cat,value);
        const g=document.createElementNS(NS,'g');g.setAttribute('class',`date-node ${st} ${info.nonwork?'nonwork':''}`);g.setAttribute('transform',`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);g.dataset.action='open-day';g.dataset.category=cat;g.dataset.day=d;g.setAttribute('tabindex','0');g.setAttribute('role','button');
        const title=document.createElementNS(NS,'title');title.textContent=`${shortDate(state.month,d)}${info.name?' • '+info.name:''} • ${formatValue(cat,value)}`;g.appendChild(title);
        const ring=document.createElementNS(NS,'circle');ring.setAttribute('class','node-ring');ring.setAttribute('r','11');g.appendChild(ring);
        const bg=document.createElementNS(NS,'circle');bg.setAttribute('class','node-bg');bg.setAttribute('r','8.7');g.appendChild(bg);
        const txt=document.createElementNS(NS,'text');txt.textContent=d;txt.setAttribute('y','.3');g.appendChild(txt);group.appendChild(g);
      }
    });
  }

  function renderDaily() {
    const cat=state.activeCategory,cfg=CONFIG[cat],days=monthDays(state.month);
    return `<section><div class="page-section-head"><div><h2>${tr('dailyTitle')}</h2><p>${tr('dailyDesc')}</p></div><button class="btn btn-primary" data-action="import">${icon('upload')} ${tr('importExcel')}</button></div>
      <div class="category-tabs">${CATEGORIES.map(c=>`<button class="category-tab ${c===cat?'active':''}" data-action="category" data-category="${c}">${tr(CONFIG[c].name)}</button>`).join('')}</div>
      <div class="panel" style="margin-top:12px"><div class="data-toolbar"><div class="left"><strong>${tr(cfg.name)}</strong><span class="table-footnote">${monthLabel(state.month)} • ${days} ${tr('date').toLowerCase()}</span></div><div class="right"><button class="btn btn-soft" data-action="template">${icon('download')} ${tr('downloadTemplate')}</button><button class="btn" data-action="export-excel">${icon('download')} ${tr('exportExcel')}</button><button class="btn btn-danger" data-action="clear-month">${icon('trash')} ${tr('clearMonth')}</button></div></div>
        <div class="table-wrap" id="dataTableWrap"><table class="data-table"><thead><tr><th>${tr('date')}</th>${cfg.columns.map(c=>`<th>${tr(c.label)}</th>`).join('')}</tr></thead><tbody>${Array.from({length:days},(_,i)=>renderDataRow(cat,i+1)).join('')}</tbody></table></div>
      </div><p class="table-footnote">${tr('savedAutomatically')}</p></section>`;
  }
  function renderDataRow(cat,day) {
    const rec=ensureMonth()[cat][day]||{}, info=holidayInfo(state.month,day), iso=isoDate(state.month,day), today=iso===TODAY;
    return `<tr id="row-${day}" class="${info.nonwork?'nonwork':''} ${today?'today':''}"><td><div class="date-cell"><div><div class="date-main">${shortDate(state.month,day)}</div><div class="date-sub">${info.name|| (info.weekend?tr('weekend'):(today?tr('today'):tr('working')))}</div></div><span class="day-badge">${dayName(state.month,day)}</span></div></td>${CONFIG[cat].columns.map(c=>renderCell(cat,day,c,rec)).join('')}</tr>`;
  }
  function renderCell(cat,day,col,rec) {
    if(col.type==='computed'){
      const v=computed(cat,col.key,rec),st=col.key==='ftp'||col.key==='testingOutput'||col.key==='paintingOutput'||col.key==='totalAttendance'?statusFor(cat,v):'blank';
      return `<td class="computed-cell ${v===null?'':st}" data-computed-field="${col.key}">${v===null?'—':`${Math.round(v*10)/10}${col.key==='totalExtraHours'?'':'%'}`}</td>`;
    }
    if(col.type==='boolean') return `<td><input class="cell-check" type="checkbox" data-field="${col.key}" data-day="${day}" data-category="${cat}" ${rec[col.key]===true||rec[col.key]===1?'checked':''} aria-label="${esc(tr(col.label))}"></td>`;
    const value=rec[col.key]??'';
    return `<td><input class="cell-input ${col.type==='text'?'cell-text':''}" type="${col.type==='number'?'number':'text'}" step="any" data-field="${col.key}" data-day="${day}" data-category="${cat}" value="${esc(value)}" placeholder="—" aria-label="${esc(tr(col.label))}"></td>`;
  }
  function refreshComputedRow(cat,day) {
    const row=$(`#row-${day}`),rec=ensureMonth()[cat][day]||{};if(!row)return;
    CONFIG[cat].columns.filter(c=>c.type==='computed').forEach(col=>{
      const cell=$(`[data-computed-field="${col.key}"]`,row);if(!cell)return;const v=computed(cat,col.key,rec);
      const st=col.key==='ftp'||col.key==='testingOutput'||col.key==='paintingOutput'||col.key==='totalAttendance'?statusFor(cat,v):'blank';
      cell.className=`computed-cell ${v===null?'':st}`;cell.textContent=v===null?'—':`${Math.round(v*10)/10}${col.key==='totalExtraHours'?'':'%'}`;
    });
  }

  function renderTargets() {
    const year=state.month.slice(0,4), holidays=Object.keys({...BUILTIN_HOLIDAYS,...state.customHolidays}).filter(d=>d.startsWith(year)).sort();
    return `<section><div class="page-section-head"><div><h2>${tr('targetsTitle')}</h2><p>${tr('targetsDesc')}</p></div><span class="live-pill">${tr('saved')}</span></div>
      <div class="target-grid">${CATEGORIES.map(c=>{const cfg=CONFIG[c];return `<article class="panel target-card"><div class="target-card-head"><div class="target-card-title"><span class="target-accent" style="background:${cfg.accent}"></span><div><h3>${tr(cfg.name)}</h3><small>${tr(cfg.metric)}</small></div></div><span class="metric-status status-${statusFor(c,aggregateMetric(c))}">${formatValue(c,aggregateMetric(c),true)}</span></div><div class="target-form"><div class="field"><label>${tr('primaryMetric')}</label><input value="${esc(tr(cfg.metric))}" disabled></div><div class="field"><label>${tr('targetValue')}</label><input type="number" step="any" data-target-category="${c}" value="${state.targets[c]}"></div></div><div class="direction-label">${cfg.direction==='min'?'↑ '+tr('directionMin'):'↓ '+tr('directionMax')}</div></article>`;}).join('')}</div>
      <div class="settings-grid"><article class="panel holiday-panel"><div class="panel-title-row"><div><h3>${tr('holidayCalendar')} • ${year}</h3><div class="section-subtitle">${tr('holidayCalendarDesc')}</div></div><span class="metric-status status-risk">${holidays.length}</span></div>
        <form class="holiday-add" id="holidayForm"><div class="field"><input type="date" name="date" min="${year}-01-01" max="${year}-12-31" aria-label="${tr('date')}"></div><div class="field"><input name="name" placeholder="${tr('holidayName')}" aria-label="${tr('holidayName')}"></div><button class="btn btn-soft" type="submit">${icon('plus')} ${tr('add')}</button></form>
        <div class="holiday-list">${holidays.map(d=>{const built=BUILTIN_HOLIDAYS[d],name=state.customHolidays[d]||(built?built[state.language==='id'?0:1]:'');return `<div class="holiday-item"><time>${shortDate(d.slice(0,7),Number(d.slice(8)))}</time><span title="${esc(name)}">${esc(name)} <small>• ${built?tr('builtIn'):tr('custom')}</small></span>${built?'<i></i>':`<button class="holiday-remove" data-action="remove-holiday" data-date="${d}" title="${tr('deleteHoliday')}">×</button>`}</div>`;}).join('')}</div>
      </article><article class="panel info-panel"><div class="panel-title-row"><h3>${tr('usageNotes')}</h3></div><ul class="info-list">${[1,2,3,4].map(i=>`<li><span class="info-number">${i}</span><span>${tr('note'+i)}</span></li>`).join('')}</ul><div style="margin-top:18px"><button class="btn btn-primary" data-action="template">${icon('download')} ${tr('downloadTemplate')}</button></div></article></div>
    </section>`;
  }

  function renderActions() {
    return `<section><div class="page-section-head"><div><h2>${tr('actionsTitle')}</h2><p>${tr('actionsDesc')}</p></div><button class="btn btn-primary" data-action="new-action">${icon('plus')} ${tr('newAction')}</button></div><div class="action-layout">${CATEGORIES.map(c=>renderActionGroup(c)).join('')}</div></section>`;
  }
  function renderActionGroup(cat) {
    const items=state.actions.filter(a=>a.category===cat), cfg=CONFIG[cat], counts={open:0,pending:0,overdue:0,done:0};items.forEach(a=>counts[actionStatus(a)]++);
    return `<article class="panel action-group"><div class="action-group-head"><div class="action-group-name"><span style="background:${cfg.accent}"></span><h3>${tr(cfg.name)}</h3></div><div class="count-pills"><span class="count-pill status-met">${counts.done}</span><span class="count-pill status-warning">${counts.pending}</span><span class="count-pill status-risk">${counts.overdue}</span></div></div><div class="action-list">${items.length?items.map(a=>`<div class="action-item"><div><h4>${esc(a.title)}</h4><div class="action-meta"><span>${tr('owner')}: <b>${esc(a.owner||'—')}</b></span><span>${tr('dueDate')}: <b>${a.dueDate||'—'}</b></span><span class="action-badge action-${actionStatus(a)}">${tr(actionStatus(a))}</span></div></div><div class="action-controls"><button class="mini-btn" data-action="edit-action" data-id="${a.id}" title="${tr('edit')}">${icon('edit')}</button><button class="mini-btn" data-action="delete-action" data-id="${a.id}" title="${tr('delete')}">${icon('trash')}</button></div></div>`).join(''):`<div class="empty-state"><div class="empty-state-icon">+</div>${tr('noAction')}</div>`}</div></article>`;
  }

  function showToast(message,error=false) {
    const el=document.createElement('div');el.className=`toast ${error?'error':''}`;el.textContent=message;$('#toastRegion').appendChild(el);setTimeout(()=>el.remove(),3600);
  }
  function confirmDialog(title,desc,confirmLabel,onConfirm) {
    const dlg=$('#confirmDialog');dlg.innerHTML=`<div class="modal-head"><div><h3>${title}</h3><p>${desc}</p></div><button class="modal-close" data-dialog-close>×</button></div><div class="modal-actions"><button class="btn" data-dialog-close>${tr('cancel')}</button><button class="btn btn-danger" id="confirmYes">${confirmLabel}</button></div>`;
    $$('[data-dialog-close]',dlg).forEach(b=>b.onclick=()=>dlg.close());$('#confirmYes',dlg).onclick=()=>{dlg.close();onConfirm();};dlg.showModal();
  }
  function openActionDialog(id=null, presetCategory=null) {
    const existing=id?state.actions.find(a=>a.id===id):null, a=existing||{category:presetCategory||state.activeCategory,title:'',owner:'',dueDate:'',status:'open'}, dlg=$('#actionDialog');
    dlg.innerHTML=`<form id="actionForm"><div class="modal-head"><div><h3>${existing?tr('edit'):tr('newAction')}</h3><p>${tr('actionsDesc')}</p></div><button type="button" class="modal-close" data-dialog-close>×</button></div><div class="modal-body"><div class="form-grid"><div class="field full"><label>${tr('title')}</label><input name="title" value="${esc(a.title)}" required></div><div class="field"><label>${tr('category')}</label><select name="category">${CATEGORIES.map(c=>`<option value="${c}" ${a.category===c?'selected':''}>${tr(CONFIG[c].name)}</option>`).join('')}</select></div><div class="field"><label>${tr('owner')}</label><input name="owner" value="${esc(a.owner||'')}"></div><div class="field"><label>${tr('dueDate')}</label><input name="dueDate" type="date" value="${a.dueDate||''}"></div><div class="field"><label>${tr('status')}</label><select name="status">${['open','pending','done'].map(s=>`<option value="${s}" ${a.status===s?'selected':''}>${tr(s)}</option>`).join('')}</select></div></div></div><div class="modal-actions"><button type="button" class="btn" data-dialog-close>${tr('cancel')}</button><button class="btn btn-primary" type="submit">${tr('save')}</button></div></form>`;
    $$('[data-dialog-close]',dlg).forEach(b=>b.onclick=()=>dlg.close());$('#actionForm',dlg).onsubmit=e=>{e.preventDefault();const fd=new FormData(e.currentTarget),obj=Object.fromEntries(fd.entries());if(existing)Object.assign(existing,obj);else state.actions.push({...obj,id:'a'+Date.now()});saveState();dlg.close();renderShell();showToast(tr('actionSaved'));};dlg.showModal();
  }

  const SHEET_NAMES={safety:'SAFETY','5s':'5S',quality:'QUALITY',delivery:'DELIVERY',cost:'COST',people:'PEOPLE'};
  function cellExportValue(cat,col,rec) {
    if(col.type==='computed'){const v=computed(cat,col.key,rec);return v===null?'':v/100;}
    if(col.type==='boolean') return !hasOwn(rec,col.key)?'':(rec[col.key]?'√':'×');
    return rec[col.key]??'';
  }
  function makeWorkbook(blank=false) {
    const wb=XLSX.utils.book_new(),days=monthDays(state.month);
    CATEGORIES.forEach(cat=>{
      const cfg=CONFIG[cat], headers=[tr('date'),...cfg.columns.map(c=>tr(c.label))], rows=[headers];
      for(let d=1;d<=days;d++){const rec=blank?{}:(ensureMonth()[cat][d]||{});rows.push([dateObj(state.month,d),...cfg.columns.map(c=>cellExportValue(cat,c,rec))]);}
      const ws=XLSX.utils.aoa_to_sheet(rows,{cellDates:true});ws['!cols']=[{wch:16},...cfg.columns.map(c=>({wch:c.type==='text'?40:19}))];
      for(let r=2;r<=days+1;r++){const ref=XLSX.utils.encode_cell({r:r-1,c:0});if(ws[ref])ws[ref].z='d mmm yyyy';}
      cfg.columns.forEach((c,idx)=>{if(c.type==='computed')for(let r=2;r<=days+1;r++){const ref=XLSX.utils.encode_cell({r:r-1,c:idx+1});if(ws[ref])ws[ref].z='0%';}});
      ws['!freeze']={xSplit:1,ySplit:1};XLSX.utils.book_append_sheet(wb,ws,SHEET_NAMES[cat]);
    });
    wb.Props={Title:'S+QDCP Dashboard Data',Company:'PT. ALFA VALVES INDONESIA',Subject:monthLabel(state.month),CreatedDate:new Date()};return wb;
  }
  function downloadWorkbook(blank=false) {
    const wb=makeWorkbook(blank),name=`ALFA-SQDCP-${blank?'Template-':''}${state.month}.xlsx`;XLSX.writeFile(wb,name);showToast(blank?tr('downloadTemplate'):tr('exportReady'));
  }
  function parseExcelDate(v) {
    if(v instanceof Date&&!isNaN(v))return v;
    if(typeof v==='number'){const p=XLSX.SSF.parse_date_code(v);return p?new Date(p.y,p.m-1,p.d):null;}
    const s=String(v||'').trim();let m=s.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);if(m)return new Date(+m[3],+m[2]-1,+m[1]);
    const d=new Date(s);return isNaN(d)?null:d;
  }
  function sheetCategory(name) {
    const n=name.toUpperCase().replace(/[^A-Z0-9]/g,'');
    if(n==='5S'||n==='SS'||n.includes('5S'))return '5s'; return CATEGORIES.find(c=>n.includes(SHEET_NAMES[c]))||null;
  }
  async function importWorkbook(file) {
    try{
      const data=await file.arrayBuffer(),wb=XLSX.read(data,{type:'array',cellDates:true}),touched=new Set();let count=0;
      wb.SheetNames.forEach(name=>{const cat=sheetCategory(name);if(!cat)return;const rows=XLSX.utils.sheet_to_json(wb.Sheets[name],{header:1,raw:true,defval:''});let h=rows.findIndex(r=>String(r[0]||'').toLowerCase().match(/date|tanggal/));if(h<0)h=0;
        rows.slice(h+1).forEach(row=>{const d=parseExcelDate(row[0]);if(!d)return;const month=`${d.getFullYear()}-${pad(d.getMonth()+1)}`,day=d.getDate();ensureMonth(month);const rec=state.months[month][cat][day]||{};
          CONFIG[cat].columns.forEach((col,i)=>{if(col.type==='computed')return;let v=row[i+1];if(v===''||v===null||v===undefined)return;if(col.type==='number'){v=Number(v);if(Number.isNaN(v))return;}if(col.type==='boolean')v=['√','✓','1','TRUE','YES','YA','OK'].includes(String(v).trim().toUpperCase())||v===1||v===true;rec[col.key]=v;count++;});
          state.months[month][cat][day]=rec;touched.add(cat);
        });
      });
      if(!count)throw new Error('No values');saveState();renderShell();showToast(tr('importSuccess',{count,sheets:touched.size}));
    }catch(err){console.error(err);showToast(tr('importError'),true);}
  }

  async function exportPDF() {
    try{
      if(state.activeView!=='overview'){state.activeView='overview';renderShell();await new Promise(r=>setTimeout(r,120));}
      showToast(tr('pdfWorking'));const node=$('#overviewCapture');node.classList.add('exporting');
      const bg=state.theme==='dark'?'#0b1114':'#f3f6f8';const canvas=await html2canvas(node,{scale:1.45,backgroundColor:bg,useCORS:false,logging:false});node.classList.remove('exporting');
      const {jsPDF}=window.jspdf,pdf=new jsPDF({orientation:'landscape',unit:'mm',format:'a3'}),pw=pdf.internal.pageSize.getWidth(),ph=pdf.internal.pageSize.getHeight(),margin=8;
      const ratio=Math.min((pw-margin*2)/canvas.width,(ph-margin*2)/canvas.height),w=canvas.width*ratio,h=canvas.height*ratio,x=(pw-w)/2,y=(ph-h)/2;
      pdf.addImage(canvas.toDataURL('image/jpeg',.92),'JPEG',x,y,w,h,undefined,'FAST');pdf.save(`ALFA-SQDCP-Dashboard-${state.month}.pdf`);showToast(tr('pdfReady'));
    }catch(err){console.error(err);$('#overviewCapture')?.classList.remove('exporting');showToast('PDF export failed. Use browser Print → Save as PDF.',true);}
  }

  $('#excelFile').addEventListener('change',e=>{const f=e.target.files[0];if(f)importWorkbook(f);e.target.value='';});
  $('#app').addEventListener('click',e=>{
    const btn=e.target.closest('[data-action]');if(!btn)return;const a=btn.dataset.action;
    if(a==='navigate'){state.activeView=btn.dataset.view;saveState();renderShell();}
    else if(a==='toggle-menu')$('#sidebar').classList.toggle('open');
    else if(a==='theme'){state.theme=state.theme==='dark'?'light':'dark';saveState();renderShell();}
    else if(a==='language'){state.language=btn.dataset.lang;saveState();renderShell();}
    else if(a==='import')$('#excelFile').click();
    else if(a==='export-excel')downloadWorkbook(false);
    else if(a==='template')downloadWorkbook(true);
    else if(a==='pdf')exportPDF();
    else if(a==='period'){state.overviewPeriod=btn.dataset.period;saveState();renderShell();}
    else if(a==='category'){state.activeCategory=btn.dataset.category;saveState();renderShell();}
    else if(a==='open-day'){state.activeCategory=btn.dataset.category;state.activeView='daily';saveState();renderShell();setTimeout(()=>$('#row-'+btn.dataset.day)?.scrollIntoView({block:'center'}),60);}
    else if(a==='clear-month')confirmDialog(tr('confirmClearTitle'),tr('confirmClearDesc',{month:monthLabel(state.month)}),tr('clear'),()=>{state.months[state.month]={};ensureMonth();saveState();renderShell();showToast(tr('monthCleared',{month:monthLabel(state.month)}));});
    else if(a==='new-action')openActionDialog(null,btn.dataset.category||null);
    else if(a==='edit-action')openActionDialog(btn.dataset.id);
    else if(a==='delete-action')confirmDialog(tr('confirmDeleteTitle'),tr('confirmDeleteDesc'),tr('delete'),()=>{state.actions=state.actions.filter(x=>x.id!==btn.dataset.id);saveState();renderShell();showToast(tr('actionDeleted'));});
    else if(a==='remove-holiday'){delete state.customHolidays[btn.dataset.date];saveState();renderShell();showToast(tr('holidayRemoved'));}
  });
  $('#app').addEventListener('change',e=>{
    if(e.target.id==='monthPicker'){state.month=e.target.value;ensureMonth();saveState();renderShell();return;}
    if(e.target.matches('[data-target-category]')){state.targets[e.target.dataset.targetCategory]=Number(e.target.value);saveState();showToast(tr('saved'));return;}
    if(e.target.matches('[data-field]')){
      const {category,day,field}=e.target.dataset;ensureMonth()[category][day]=ensureMonth()[category][day]||{};
      let v=e.target.type==='checkbox'?e.target.checked:e.target.value;if(e.target.type==='number')v=v===''?null:Number(v);
      if(v===null||v==='')delete ensureMonth()[category][day][field];else ensureMonth()[category][day][field]=v;saveState();refreshComputedRow(category,day);
    }
  });
  $('#app').addEventListener('input',e=>{
    if(e.target.matches('[data-field]')&&e.target.type!=='checkbox'){
      const {category,day,field}=e.target.dataset;ensureMonth()[category][day]=ensureMonth()[category][day]||{};let v=e.target.value;if(e.target.type==='number')v=v===''?null:Number(v);if(v===null||v==='')delete ensureMonth()[category][day][field];else ensureMonth()[category][day][field]=v;saveState();
    }
  });
  $('#app').addEventListener('submit',e=>{
    if(e.target.id==='holidayForm'){e.preventDefault();const fd=new FormData(e.target),date=fd.get('date'),name=String(fd.get('name')||'').trim();if(!date||!name)return showToast(tr('invalidHoliday'),true);state.customHolidays[date]=name;saveState();renderShell();showToast(tr('holidayAdded'));}
  });
  $('#app').addEventListener('keydown',e=>{const n=e.target.closest('.date-node');if(n&&(e.key==='Enter'||e.key===' ')){e.preventDefault();n.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});

  ensureMonth();renderShell();
})();
