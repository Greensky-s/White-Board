// 🌟 Canvas2D willReadFrequently 성능 최적화
const originalGetContext = HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext = function(type, attributes) {
  if (type === '2d') {
    attributes = attributes || {};
    attributes.willReadFrequently = true;
  }
  return originalGetContext.call(this, type, attributes);
};

// 🌟 CanvasTextBaseline 오타 교정 (alphabetical -> alphabetic)
if (typeof CanvasRenderingContext2D !== 'undefined') {
  const desc = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'textBaseline');
  if (desc && desc.set) {
    const origSet = desc.set;
    Object.defineProperty(CanvasRenderingContext2D.prototype, 'textBaseline', {
      set: function(val) {
        return origSet.call(this, val === 'alphabetical' ? 'alphabetic' : val);
      },
      get: desc.get,
      configurable: true,
      enumerable: true
    });
  }
}

// 🌟 내장 다국어 엔진
const i18n = {
  ko: {
    toolSelect: "선택/편집 (V)", toolPan: "화면 이동 (Space)", toolPen: "펜 (P)", toolHighlighter: "형광펜",
    toolLaser: "레이저 포인터 (L 누르고 있기)", toolEraser: "지우개", toolShape: "도형",
    toolText: "텍스트 입력", toolSticky: "포스트잇 (메모)", toolImage: "이미지 추가",
    toolTheme: "배경 테마 변경", toolTimer: "수업 타이머", toolFullscreen: "전체화면 전환",
    toolScreenshot: "화면 저장", toolHideUI: "UI 모두 숨기기 (몰입 모드)", toolUndo: "실행 취소(Ctrl+Z)",
    toolRedo: "되돌리기(Ctrl+Y)", toolClear: "전체 지우기", lblLayer: "레이어", lblAlign: "정렬",
    lblMode: "모드", lblShape: "도형", modeFree: "자유형 〰️", modeStraight: "직선 ➖",
    lblColor: "색상", lblFill: "배경", lblStrokeWidth: "선의 굵기", lblTextSize: "글자 크기",
    lblSize: "크기", lblStyle: "스타일", lblOpacity: "투명도", btnObjLock: "개체 고정/해제 (Ctrl+L)",
    timerDrag: "타이머 (드래그 이동)", timerReset: "리셋", timerStart: "시작", timerPause: "일시정지", timerClose: "닫기",
    promptClear: "전체 지우시겠습니까?", promptTimerEnd: "시간 종료!", defaultText: "텍스트 입력", defaultMemo: "메모",
    dynBorderColor: "테두리 색상", dynFillColor: "채우기 색상", dynLineColor: "선 색상",
    dynTextColor: "글자 색상", dynPaperColor: "종이 색상", btnDock: "화면 중앙에 고정",
    btnLock: "도구 잠금 (연속 그리기)", btnUnlock: "도구 잠금 해제", restoreUI: "메뉴 다시 보기",
    btnAlignL: "왼쪽 정렬", btnAlignC: "가운데 정렬", btnAlignR: "오른쪽 정렬",
    layerFront: "맨 앞으로", layerForward: "앞으로", layerBackward: "뒤로", layerBack: "맨 뒤로",
    colorTrans: "투명", colorWhite: "하양(검정)", colorRed: "빨강", colorBlue: "파랑",
    colorGreen: "초록", colorYellow: "노랑", customColor: "자유 색상 선택",
    fillPink: "연빨강", fillBlue: "연파랑", fillGreen: "연초록", fillYellow: "포스트잇 노랑", opacityAdjust: "투명도 조절"
  },
  en: {
    toolSelect: "Select/Edit (V)", toolPan: "Pan (Space)", toolPen: "Pen (P)", toolHighlighter: "Highlighter",
    toolLaser: "Laser Pointer (Hold L)", toolEraser: "Eraser", toolShape: "Shapes",
    toolText: "Text", toolSticky: "Sticky Note", toolImage: "Add Image",
    toolTheme: "Change Theme", toolTimer: "Timer", toolFullscreen: "Fullscreen",
    toolScreenshot: "Save Image", toolHideUI: "Hide UI", toolUndo: "Undo (Ctrl+Z)",
    toolRedo: "Redo (Ctrl+Y)", toolClear: "Clear All", lblLayer: "Layer", lblAlign: "Align",
    lblMode: "Mode", lblShape: "Shape", modeFree: "Freehand 〰️", modeStraight: "Straight ➖",
    lblColor: "Color", lblFill: "Fill", lblStrokeWidth: "Line Width", lblTextSize: "Text Size",
    lblSize: "Size", lblStyle: "Style", lblOpacity: "Opacity", btnObjLock: "Lock/Unlock Object (Ctrl+L)",
    timerDrag: "Timer (Drag)", timerReset: "Reset", timerStart: "Start", timerPause: "Pause", timerClose: "Close",
    promptClear: "Clear the entire board?", promptTimerEnd: "Time is up!", defaultText: "Enter text", defaultMemo: "Memo",
    dynBorderColor: "Border Color", dynFillColor: "Fill Color", dynLineColor: "Line Color",
    dynTextColor: "Text Color", dynPaperColor: "Paper Color", btnDock: "Dock Toolbar",
    btnLock: "Lock Tool", btnUnlock: "Unlock Tool", restoreUI: "Show UI",
    btnAlignL: "Align Left", btnAlignC: "Align Center", btnAlignR: "Align Right",
    layerFront: "Bring to Front", layerForward: "Bring Forward", layerBackward: "Send Backward", layerBack: "Send to Back",
    colorTrans: "Transparent", colorWhite: "White(Black)", colorRed: "Red", colorBlue: "Blue",
    colorGreen: "Green", colorYellow: "Yellow", customColor: "Custom Color",
    fillPink: "Soft Red", fillBlue: "Soft Blue", fillGreen: "Soft Green", fillYellow: "Sticky Note", opacityAdjust: "Opacity"
  }
};
const lang = (chrome.i18n.getUILanguage() || 'ko').startsWith('ko') ? 'ko' : 'en';
const t = (key) => i18n[lang][key] || key;

document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.getAttribute('data-i18n-title')); });
document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.getAttribute('data-i18n')); });

fabric.Text.prototype.fontFamily = 'Pretendard';
fabric.IText.prototype.fontFamily = 'Pretendard';
fabric.Textbox.prototype.fontFamily = 'Pretendard'; 
fabric.Textbox.prototype.setControlsVisibility({ mt: false, mb: false, ml: true, mr: true, tl: true, tr: true, bl: true, br: true });

fabric.Text.prototype._setTextStyles = function(ctx, prevStyle, forMeasuring) {
  ctx.textBaseline = 'alphabetic';
  if (this.path) {
    switch (this.pathAlign) {
      case 'center': ctx.textBaseline = 'middle'; break;
      case 'ascender': ctx.textBaseline = 'top'; break;
      case 'descender': ctx.textBaseline = 'bottom'; break;
    }
  }
  ctx.font = this._getFontDeclaration(prevStyle, forMeasuring);
};

// 잠금 속성 직렬화 등록
fabric.Object.prototype.stateProperties.push('isLocked');
const origToObject = fabric.Object.prototype.toObject;
fabric.Object.prototype.toObject = function(propertiesToInclude) {
  return origToObject.call(this, (propertiesToInclude || []).concat(['isLocked', 'isStickyNote']));
};

const renderPaddedBackground = function(ctx) {
  if (!this.backgroundColor) return;
  var dim = this._getNonTransformedDimensions();
  ctx.fillStyle = this.backgroundColor;
  var p = this.padding || 0;
  ctx.fillRect(-dim.x / 2 - p, -dim.y / 2 - p, dim.x + p * 2, dim.y + p * 2);
};
fabric.IText.prototype._renderBackground = renderPaddedBackground;
fabric.Textbox.prototype._renderBackground = renderPaddedBackground;

// 각도 스냅 해제
fabric.Object.prototype.snapAngle = 0;
fabric.Object.prototype.snapThreshold = 0;

const canvas = new fabric.Canvas('board', { 
  backgroundColor: '#121212', width: window.innerWidth, height: window.innerHeight, 
  selection: true, preserveObjectStacking: true, perPixelTargetFind: false 
});
window.addEventListener('resize', () => { canvas.setWidth(window.innerWidth); canvas.setHeight(window.innerHeight); canvas.renderAll(); });

let currentTool = 'select';
let selectedShape = 'shape-rect';
let currentColor = '#ffffff'; 
let currentHighlighterColor = '#feca57'; 
let currentStickyBg = '#fdf065'; 
let currentStickyColor = '#111111'; 
let currentFillBase = 'transparent'; 
let currentOpacity = 0.7; 
let currentSize = 5;
let currentFontSize = 30;
let currentStyle = 'solid';
let currentTheme = 'dark'; 
let isToolLocked = false;
let penMode = 'free'; 

let isDrawingShape = false;
let isErasingStroke = false;
let startPx, startPy, activeShape = null, activeArrowHead = null;
let internalClipboard = null;

// 🌟 최적화 1: 히스토리 30단계 FIFO 큐 & 디바운스 엔진
const MAX_HISTORY = 30;
let history = []; 
let historyStep = -1; 
let isHistoryProcessing = false;
let historyTimer = null;

function flushHistoryDebounce() {
  if (historyTimer) {
    clearTimeout(historyTimer);
    historyTimer = null;
    history = history.slice(0, historyStep + 1);
    history.push(JSON.stringify(canvas));
    if (history.length > MAX_HISTORY) history.shift();
    historyStep = history.length - 1;
  }
}

function saveHistory(immediate = false) {
  if (isHistoryProcessing) return;
  const record = () => {
    history = history.slice(0, historyStep + 1);
    history.push(JSON.stringify(canvas));
    if (history.length > MAX_HISTORY) {
      history.shift();
    }
    historyStep = history.length - 1;
  };

  if (immediate) {
    if (historyTimer) {
      clearTimeout(historyTimer);
      historyTimer = null;
    }
    record();
  } else {
    if (historyTimer) clearTimeout(historyTimer);
    historyTimer = setTimeout(() => {
      record();
      historyTimer = null;
    }, 250);
  }
}

// 🌟 최적화 2: 고용량 이미지 FHD(1920px) 리사이징 전처리
function optimizeImage(dataUrl, callback) {
  const img = new Image();
  img.onload = () => {
    const maxDim = 1920;
    let w = img.width;
    let h = img.height;
    if (w > maxDim || h > maxDim) {
      if (w > h) {
        h = Math.round((h * maxDim) / w);
        w = maxDim;
      } else {
        w = Math.round((w * maxDim) / h);
        h = maxDim;
      }
    }
    const offCanvas = document.createElement('canvas');
    offCanvas.width = w;
    offCanvas.height = h;
    const ctx = offCanvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    const isPng = dataUrl.startsWith('data:image/png');
    const optimized = isPng ? offCanvas.toDataURL('image/png') : offCanvas.toDataURL('image/jpeg', 0.85);
    callback(optimized);
  };
  img.onerror = () => callback(dataUrl);
  img.src = dataUrl;
}

// 레이저 포인터 상태 관리
let laserPoints = [];
let isLaserDrawing = false;
let laserAnim = null;
let currentLaserPos = null;
let previousToolBeforeLaser = null;
let isLaserKeyHeld = false;

const opacityDisplay = document.getElementById('opacity-display');
const opacitySlider = document.getElementById('fill-opacity-slider');

saveHistory(true);

function syncOpacityUI(val) {
  currentOpacity = Math.max(0.05, Math.min(1, Math.round(parseFloat(val) * 100) / 100));
  if (opacitySlider) opacitySlider.value = currentOpacity;
  if (opacityDisplay) opacityDisplay.innerText = Math.round(currentOpacity * 100) + '%';
}

function getFillColor() {
  if (currentFillBase === 'transparent') return 'transparent';
  let r = parseInt(currentFillBase.slice(1, 3), 16) || 255;
  let g = parseInt(currentFillBase.slice(3, 5), 16) || 255;
  let b = parseInt(currentFillBase.slice(5, 7), 16) || 255;
  return `rgba(${r},${g},${b},${currentOpacity})`;
}
function getStickyBgColor() {
  let r = parseInt(currentStickyBg.slice(1, 3), 16) || 253;
  let g = parseInt(currentStickyBg.slice(3, 5), 16) || 240;
  let b = parseInt(currentStickyBg.slice(5, 7), 16) || 101;
  return `rgba(${r},${g},${b},${currentOpacity})`;
}
function getActiveStrokeColor() {
  if (currentTool === 'highlighter') return currentHighlighterColor;
  if (currentTool === 'sticky') return currentStickyColor;
  return currentColor;
}
function getActiveFillBase() {
  if (currentTool === 'sticky') return currentStickyBg;
  return currentFillBase;
}
function getDashArray(style, width) {
  if (style === 'dashed') return [width * 3, width * 2];
  if (style === 'dotted') return [width, width * 2];
  return null;
}

// 툴바 드래그 및 고정
const uiContainer = document.getElementById('ui-container');
const dragHandle = document.getElementById('main-drag-handle');
const btnDock = document.getElementById('btn-dock');
let isDraggingUI = false, uiStartX, uiStartY, uiInitX, uiInitY;

function keepInBounds() {
  if (!uiContainer.classList.contains('undocked')) return;
  const rect = uiContainer.getBoundingClientRect();
  let newLeft = Math.max(15, Math.min(rect.left, window.innerWidth - rect.width - 15));
  let newTop = Math.max(15, Math.min(rect.top, window.innerHeight - rect.height - 15));
  uiContainer.style.left = newLeft + 'px'; uiContainer.style.top = newTop + 'px';
}

dragHandle.addEventListener('mousedown', (e) => {
  isDraggingUI = true; uiStartX = e.clientX; uiStartY = e.clientY;
  const rect = uiContainer.getBoundingClientRect();
  uiInitX = rect.left; uiInitY = rect.top;
  uiContainer.classList.add('undocked');
  uiContainer.style.left = uiInitX + 'px'; uiContainer.style.top = uiInitY + 'px';
});
window.addEventListener('mousemove', (e) => {
  if (isDraggingUI) { 
    uiContainer.style.left = (uiInitX + e.clientX - uiStartX) + 'px'; 
    uiContainer.style.top = (uiInitY + e.clientY - uiStartY) + 'px'; 
  }
});
window.addEventListener('mouseup', () => { 
  if (isDraggingUI) { isDraggingUI = false; keepInBounds(); }
});

if (btnDock) {
  btnDock.addEventListener('click', () => {
    uiContainer.classList.remove('undocked');
    uiContainer.style.left = ''; uiContainer.style.top = '';
  });
}

// 서브 툴바 제어
const subToolbar = document.getElementById('sub-toolbar');
const gShapeType = document.getElementById('grp-shape-type');
const gSelect = document.getElementById('grp-select');
const gPenMode = document.getElementById('grp-pen-mode');
const gStrokeColor = document.getElementById('grp-stroke-color');
const gFill = document.getElementById('grp-fill');
const gOpacity = document.getElementById('grp-opacity');
const gSize = document.getElementById('grp-size');
const gStyle = document.getElementById('grp-style');
const btnObjLock = document.getElementById('btn-obj-lock');

const shapeIcons = {
  'shape-rect': '▭',
  'shape-circle': '◯',
  'shape-diamond': '◇',
  'shape-arrow': '↗',
  'shape-line': '➖'
};
const btnShapeMain = document.getElementById('btn-shape-main');

canvas.on('selection:created', handleSelection);
canvas.on('selection:updated', handleSelection);
canvas.on('selection:cleared', () => { if (currentTool === 'select') updateSubToolbar(false); });

function handleSelection() {
  if (currentTool !== 'select') {
    currentTool = 'select';
    document.querySelectorAll('.icon-btn[data-tool]').forEach(b => b.classList.remove('active'));
    document.querySelector('.icon-btn[data-tool="select"]')?.classList.add('active');
  }
  updateSubToolbar(true);
}

function toggleObjectLock(targetObj) {
  const obj = targetObj || canvas.getActiveObject();
  if (!obj) return;
  const objs = obj.type === 'activeSelection' ? obj.getObjects() : [obj];
  const shouldLock = !objs.every(o => o.isLocked);
  
  objs.forEach(o => {
    o.isLocked = shouldLock;
    o.set({
      lockMovementX: shouldLock,
      lockMovementY: shouldLock,
      lockRotation: shouldLock,
      lockScalingX: shouldLock,
      lockScalingY: shouldLock,
      hasControls: !shouldLock
    });
  });
  
  updateSubToolbar(true);
  canvas.requestRenderAll();
  saveHistory(true);
}

btnObjLock.addEventListener('click', () => toggleObjectLock());

function updateSubToolbar(isObjectSelected = false) {
  [gShapeType, gSelect, gPenMode, gStrokeColor, gFill, gOpacity, gSize, gStyle].forEach(g => { if(g) g.style.display = 'none'; });
  const lblStroke = document.getElementById('lbl-stroke');
  const lblFill = document.getElementById('lbl-fill');
  const lblSize = document.getElementById('lbl-size');
  const btnStrokeTrans = document.getElementById('stroke-transparent');
  const btnFillTrans = document.getElementById('fill-transparent');

  if (isObjectSelected || currentTool === 'select') {
    const obj = canvas.getActiveObject();
    if (!obj) { subToolbar.style.display = 'none'; return; }
    subToolbar.style.display = 'flex';
    gSelect.style.display = 'flex'; gStrokeColor.style.display = 'flex'; gSize.style.display = 'flex';
    btnStrokeTrans.style.display = 'flex'; btnFillTrans.style.display = 'flex';

    const isLocked = obj.isLocked || (obj.type === 'activeSelection' && obj.getObjects().every(o => o.isLocked));
    btnObjLock.innerText = isLocked ? '🔒' : '🔓';
    btnObjLock.classList.toggle('active', isLocked);

    if (['rect', 'circle', 'ellipse', 'polygon', 'triangle'].includes(obj.type)) {
      gFill.style.display = 'flex'; gStyle.style.display = 'flex'; gOpacity.style.display = 'flex';
      lblStroke.innerText = t('dynBorderColor'); lblFill.innerText = t('dynFillColor'); lblSize.innerText = t('lblStrokeWidth');
      if (obj.fill && obj.fill.startsWith('rgba')) {
        const match = obj.fill.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([0-9.]+)\)/);
        if (match) syncOpacityUI(match[1]);
      }
    } else if (['line', 'group'].includes(obj.type)) {
      gStyle.style.display = 'flex'; lblStroke.innerText = t('dynLineColor'); lblSize.innerText = t('lblStrokeWidth');
    } else if (['i-text', 'text', 'textbox'].includes(obj.type)) {
      lblSize.innerText = t('lblTextSize');
      lblStroke.innerText = t('dynTextColor');
      if (obj.isStickyNote) {
        gFill.style.display = 'flex'; gOpacity.style.display = 'flex';
        btnFillTrans.style.display = 'none';
        lblFill.innerText = t('dynPaperColor');
        if (obj.backgroundColor && obj.backgroundColor.startsWith('rgba')) {
          const match = obj.backgroundColor.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([0-9.]+)\)/);
          if (match) syncOpacityUI(match[1]);
        }
      }
    }
  } 
  else {
    if (currentTool === 'eraser' || currentTool === 'pan' || currentTool === 'laser') {
      subToolbar.style.display = 'none'; return;
    }
    subToolbar.style.display = 'flex';
    btnStrokeTrans.style.display = 'none'; btnFillTrans.style.display = 'flex';

    if (currentTool === 'pen') {
      gPenMode.style.display = 'flex'; gStrokeColor.style.display = 'flex'; gSize.style.display = 'flex';
      lblStroke.innerText = t('lblColor'); lblSize.innerText = t('lblStrokeWidth');
    }
    else if (currentTool === 'highlighter') {
      gPenMode.style.display = 'flex'; gStrokeColor.style.display = 'flex'; gSize.style.display = 'flex'; gOpacity.style.display = 'flex';
      lblStroke.innerText = t('lblColor'); lblSize.innerText = t('lblStrokeWidth');
      syncOpacityUI(currentOpacity);
    }
    else if (['shape-rect', 'shape-circle', 'shape-diamond', 'shape-arrow', 'shape-line'].includes(currentTool)) {
      gShapeType.style.display = 'flex';
      gStrokeColor.style.display = 'flex';
      gSize.style.display = 'flex';
      gStyle.style.display = 'flex';
      lblSize.innerText = t('lblStrokeWidth');

      document.querySelectorAll('.shape-choice-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-shape') === currentTool);
      });

      if (['shape-rect', 'shape-circle', 'shape-diamond'].includes(currentTool)) {
        gFill.style.display = 'flex';
        gOpacity.style.display = 'flex';
        lblStroke.innerText = t('dynBorderColor'); 
        lblFill.innerText = t('dynFillColor');
        syncOpacityUI(currentOpacity);
      } else {
        gFill.style.display = 'none';
        lblStroke.innerText = t('dynLineColor');
      }
    }
    else if (currentTool === 'text') {
      gStrokeColor.style.display = 'flex'; gSize.style.display = 'flex';
      lblStroke.innerText = t('dynTextColor'); lblSize.innerText = t('lblTextSize');
    }
    else if (currentTool === 'sticky') {
      gStrokeColor.style.display = 'flex'; gSize.style.display = 'flex'; gFill.style.display = 'flex'; gOpacity.style.display = 'flex';
      btnFillTrans.style.display = 'none';
      lblStroke.innerText = t('dynTextColor'); lblFill.innerText = t('dynPaperColor'); lblSize.innerText = t('lblTextSize');
      syncOpacityUI(currentOpacity);
    }
  }
}

function updateMode() {
  updateSubToolbar();
  const isSelect = currentTool === 'select';
  canvas.selection = isSelect;
  
  let activeStroke = getActiveStrokeColor();
  let activeFill = getActiveFillBase();
  
  document.querySelectorAll('.color-btn[data-target="stroke"]').forEach(b => { b.classList.toggle('active', b.getAttribute('data-color') === activeStroke); });
  document.querySelectorAll('.color-btn[data-target="fill"]').forEach(b => { b.classList.toggle('active', b.getAttribute('data-color') === activeFill); });

  if ((currentTool === 'pen' || currentTool === 'highlighter') && penMode === 'free') {
    canvas.isDrawingMode = true; 
    canvas.freeDrawingCursor = 'crosshair';
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    let colorObj = new fabric.Color(activeStroke === 'transparent' ? '#000' : activeStroke);
    canvas.freeDrawingBrush.color = currentTool === 'highlighter' ? colorObj.setAlpha(currentOpacity * 0.4).toRgba() : colorObj.setAlpha(currentOpacity).toRgba();
    canvas.freeDrawingBrush.width = currentTool === 'highlighter' ? currentSize * 5 : currentSize;
    canvas.freeDrawingBrush.strokeLineCap = 'round';
    canvas.freeDrawingBrush.strokeLineJoin = 'round';
  } else { 
    canvas.isDrawingMode = false; 
  }

  canvas.defaultCursor = (isSelect) ? 'default' : (currentTool === 'pan' ? 'grab' : 'crosshair');
  canvas.forEachObject(o => { 
    o.set('selectable', isSelect); 
    o.set('evented', isSelect || currentTool === 'eraser'); 
  });
  canvas.requestRenderAll();
}

// 메인 툴바 도구 클릭
document.querySelectorAll('.icon-btn[data-tool]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.icon-btn[data-tool]').forEach(b => b.classList.remove('active')); 
    e.currentTarget.classList.add('active');
    let tool = e.currentTarget.getAttribute('data-tool');
    
    if (tool === 'shape') {
      currentTool = selectedShape;
    } else {
      currentTool = tool;
    }

    if (currentTool === 'pen' || currentTool === 'highlighter') penMode = 'free';
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.mode-btn[data-mode="${penMode}"]`)?.classList.add('active');
    document.getElementById('stroke-width-input').value = ['text', 'sticky'].includes(currentTool) ? currentFontSize : currentSize;
    canvas.discardActiveObject(); updateMode();
  });
});

// 서브 툴바 도형 선택 버튼
document.querySelectorAll('.shape-choice-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    selectedShape = e.currentTarget.getAttribute('data-shape');
    currentTool = selectedShape;
    btnShapeMain.innerText = shapeIcons[selectedShape] || '▭';
    
    document.querySelectorAll('.shape-choice-btn').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    canvas.discardActiveObject();
    updateMode();
  });
});

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const parentGroup = e.currentTarget.closest('.prop-group');
    parentGroup.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active')); e.currentTarget.classList.add('active');
    penMode = e.currentTarget.getAttribute('data-mode'); updateMode();
  });
});

function resetToSelectTool() {
  if (isToolLocked) return;
  currentTool = 'select'; document.querySelectorAll('.icon-btn[data-tool]').forEach(b => b.classList.remove('active'));
  document.querySelector('.icon-btn[data-tool="select"]')?.classList.add('active'); updateMode();
}

document.getElementById('btn-lock-tool').addEventListener('click', e => {
  isToolLocked = !isToolLocked; e.currentTarget.classList.toggle('active', isToolLocked);
  e.currentTarget.title = isToolLocked ? t('btnUnlock') : t('btnLock');
});

// 🌟 연속 펜 드로잉 완료 시 디바운스 기록
canvas.on('path:created', function() { 
  saveHistory(false); 
});

function handleColorChange(target, color) {
  if (target === 'stroke') { if (currentTool === 'highlighter') currentHighlighterColor = color; else if (currentTool === 'sticky') currentStickyColor = color; else currentColor = color; }
  else if (target === 'fill') { if (currentTool === 'sticky') currentStickyBg = color; else currentFillBase = color; }

  const activeObj = canvas.getActiveObject();

  if(activeObj) {
    if (target === 'stroke') {
      if (['i-text', 'text', 'textbox'].includes(activeObj.type)) {
        if (activeObj.isEditing && activeObj.selectionStart !== activeObj.selectionEnd) activeObj.setSelectionStyles({ fill: color });
        else { activeObj.set('fill', color); }
      } else { activeObj.set('stroke', color); }
    } else if (target === 'fill') {
      if (['rect', 'circle', 'ellipse', 'polygon', 'triangle'].includes(activeObj.type)) activeObj.set('fill', getFillColor());
      else if (['i-text', 'text', 'textbox'].includes(activeObj.type) && activeObj.isStickyNote) {
        activeObj.set('backgroundColor', getStickyBgColor());
      }
    }
    canvas.renderAll(); 
    saveHistory(false);
  }
  updateMode();
}

document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = e.currentTarget.getAttribute('data-target'); const color = e.currentTarget.getAttribute('data-color');
    document.querySelectorAll(`.color-btn[data-target="${target}"]`).forEach(b => b.classList.remove('active')); e.currentTarget.classList.add('active');
    handleColorChange(target, color);
  });
});

document.getElementById('custom-stroke').addEventListener('input', (e) => {
  document.querySelectorAll(`.color-btn[data-target="stroke"]`).forEach(b => b.classList.remove('active')); handleColorChange('stroke', e.target.value);
});
document.getElementById('custom-fill').addEventListener('input', (e) => {
  document.querySelectorAll(`.color-btn[data-target="fill"]`).forEach(b => b.classList.remove('active')); handleColorChange('fill', e.target.value);
});

opacitySlider.addEventListener('input', (e) => {
  syncOpacityUI(e.target.value);
  const activeObj = canvas.getActiveObject();
  if (activeObj) {
    if (['rect', 'circle', 'ellipse', 'polygon', 'triangle'].includes(activeObj.type)) {
      activeObj.set('fill', getFillColor());
    } else if (activeObj.isStickyNote) {
      activeObj.set('backgroundColor', getStickyBgColor());
    } else if (activeObj.type === 'path') {
      activeObj.set('opacity', currentOpacity);
    }
    canvas.renderAll();
  } else if (currentTool === 'highlighter' && canvas.freeDrawingBrush) {
    let colorObj = new fabric.Color(currentHighlighterColor);
    canvas.freeDrawingBrush.color = colorObj.setAlpha(currentOpacity * 0.4).toRgba();
  }
});
opacitySlider.addEventListener('change', () => saveHistory(true));

const sizeInput = document.getElementById('stroke-width-input');
sizeInput.addEventListener('input', (e) => {
  let val = parseInt(e.target.value) || 5; const activeObj = canvas.getActiveObject();
  let isTextMode = ['text', 'sticky'].includes(currentTool) || (activeObj && ['i-text', 'text', 'textbox'].includes(activeObj.type));
  if (isTextMode) {
    currentFontSize = val;
    if(activeObj) {
      if (activeObj.isEditing && activeObj.selectionStart !== activeObj.selectionEnd) { 
        activeObj.setSelectionStyles({ fontSize: val }); 
      } else { 
        let oldFontSize = activeObj.fontSize || 1;
        activeObj.set('fontSize', val); 
        if (activeObj.type === 'textbox') {
            activeObj.set('width', activeObj.width * (val / oldFontSize));
        }
        activeObj.set({scaleX: 1, scaleY: 1}); 
      }
    }
  } else { currentSize = val; if(activeObj) activeObj.set('strokeWidth', currentSize); }
  if(activeObj) canvas.renderAll(); updateMode();
});
sizeInput.addEventListener('change', () => saveHistory(true));
document.getElementById('btn-plus').addEventListener('click', () => { sizeInput.value = parseInt(sizeInput.value) + 1; sizeInput.dispatchEvent(new Event('input')); sizeInput.dispatchEvent(new Event('change')); });
document.getElementById('btn-minus').addEventListener('click', () => { sizeInput.value = Math.max(1, parseInt(sizeInput.value) - 1); sizeInput.dispatchEvent(new Event('input')); sizeInput.dispatchEvent(new Event('change')); });

document.querySelectorAll('.stroke-style-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.stroke-style-btn').forEach(b => b.classList.remove('active')); e.currentTarget.classList.add('active');
    currentStyle = e.currentTarget.dataset.style;
    const obj = canvas.getActiveObject(); if(obj) { obj.set('strokeDashArray', getDashArray(currentStyle, obj.strokeWidth)); canvas.renderAll(); saveHistory(true); }
  });
});

document.querySelectorAll('.layer-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const action = e.currentTarget.dataset.layer; const obj = canvas.getActiveObject(); if(!obj) return;
    if(action === 'front') canvas.bringToFront(obj); if(action === 'forward') canvas.bringForward(obj);
    if(action === 'backward') canvas.sendBackwards(obj); if(action === 'back') canvas.sendToBack(obj);
    canvas.renderAll(); saveHistory(true);
  });
});

document.querySelectorAll('.align-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const alignType = e.currentTarget.getAttribute('data-align'); const activeSel = canvas.getActiveObject();
    if (!activeSel || activeSel.type !== 'activeSelection') { alert("정렬하려면 객체를 여러 개 선택해주세요."); return; }
    const objects = activeSel.getObjects(); canvas.discardActiveObject(); 
    let minL = Infinity, maxR = -Infinity;
    objects.forEach(obj => { let rect = obj.getBoundingRect(); if (rect.left < minL) minL = rect.left; if (rect.left + rect.width > maxR) maxR = rect.left + rect.width; });
    const cX = minL + (maxR - minL) / 2;
    if (alignType === 'left') objects.forEach(obj => obj.set({ left: minL }));
    else if (alignType === 'center') objects.forEach(obj => obj.set({ left: cX - (obj.getBoundingRect().width / 2) }));
    else if (alignType === 'right') objects.forEach(obj => obj.set({ left: maxR - obj.getBoundingRect().width }));
    let sel = new fabric.ActiveSelection(objects, { canvas: canvas }); canvas.setActiveObject(sel); canvas.requestRenderAll(); saveHistory(true);
  });
});

canvas.on('selection:updated', updateSizeInput); 
function updateSizeInput() {
  const obj = canvas.getActiveObject(); if (!obj) return;
  sizeInput.value = ['i-text', 'text', 'textbox'].includes(obj.type) ? Math.round(obj.fontSize * obj.scaleY) : Math.round(obj.strokeWidth);
}
canvas.on('object:scaling', function(e) {
  if (!e.target) return;
  sizeInput.value = ['i-text', 'text', 'textbox'].includes(e.target.type) ? Math.round(e.target.fontSize * e.target.scaleX) : Math.round(e.target.strokeWidth);
});

canvas.on('object:modified', function(e) { 
  if (e.target && ['i-text', 'text', 'textbox'].includes(e.target.type)) {
    if (e.target.scaleX !== 1 || e.target.scaleY !== 1) {
        let newFontSize = e.target.fontSize * e.target.scaleX;
        let newWidth = e.target.width * e.target.scaleX;
        e.target.set({
            fontSize: Math.round(newFontSize),
            width: Math.round(newWidth),
            scaleX: 1,
            scaleY: 1
        });
        currentFontSize = Math.round(newFontSize);
        sizeInput.value = currentFontSize;
    }
  }
  saveHistory(false); 
});

// 텍스트 상자 가로 자동 확장 & 엔터 시 너비 고정
canvas.on('text:changed', function(opt) {
  const obj = opt.target;
  if (obj && obj.type === 'textbox' && !obj.isStickyNote) {
    const lines = obj.text.split('\n');
    const maxWidth = Math.max(150, canvas.width - obj.left - 40);
    if (lines.length <= 1) {
      const textWidth = obj.getLineWidth(0) + (obj.fontSize || 30);
      obj.set('width', Math.min(maxWidth, Math.max(60, textWidth)));
    } else {
      let maxLineW = 0;
      for (let i = 0; i < lines.length; i++) {
        maxLineW = Math.max(maxLineW, obj.getLineWidth(i));
      }
      obj.set('width', Math.min(maxWidth, Math.max(obj.width, maxLineW + 15)));
    }
    canvas.renderAll();
  }
});

let isPanning = false; let lastPosX = 0; let lastPosY = 0;

canvas.on('mouse:down', function(options) {
  if (currentTool === 'pan' || options.e.code === 'Space') {
    isPanning = true; canvas.selection = false; lastPosX = options.e.clientX; lastPosY = options.e.clientY; canvas.defaultCursor = 'grabbing'; return;
  }
  if (canvas.isDrawingMode || currentTool === 'select') return;
  const pointer = canvas.getPointer(options.e);

  if (currentTool === 'laser') {
    isLaserDrawing = true;
    currentLaserPos = { x: pointer.x, y: pointer.y };
    laserPoints = [{ x: pointer.x, y: pointer.y, time: Date.now() }];
    if (!laserAnim) renderLaser();
    return;
  }

  // 획 지우개 시작
  if (currentTool === 'eraser') { 
    isErasingStroke = true; 
    if (options.target && !options.target.isLocked) {
      canvas.remove(options.target);
    } 
    return; 
  }

  if (currentTool === 'text' || currentTool === 'sticky') {
    if (options.target && ['i-text', 'text', 'textbox'].includes(options.target.type)) return; 
    const isSticky = currentTool === 'sticky';
    let actStroke = getActiveStrokeColor();
    const stickyBg = isSticky ? getStickyBgColor() : 'transparent';
    const stickyText = isSticky ? currentStickyColor : actStroke;
    
    const textNode = new fabric.Textbox(isSticky ? t('defaultMemo') : t('defaultText'), {
      left: pointer.x, top: pointer.y, fill: isSticky ? stickyText : actStroke, backgroundColor: stickyBg,
      fontSize: currentFontSize, padding: isSticky ? 15 : 5, opacity: 1,
      width: isSticky ? 200 : 80, 
      splitByGrapheme: true,
      shadow: isSticky ? new fabric.Shadow({ color: 'rgba(0,0,0,0.3)', blur: 10, offsetX: 3, offsetY: 3 }) : null
    });
    textNode.isStickyNote = isSticky;
    canvas.add(textNode); canvas.setActiveObject(textNode); 
    setTimeout(() => { textNode.enterEditing(); textNode.selectAll(); }, 50); resetToSelectTool(); return; 
  }

  if (['shape-rect', 'shape-circle', 'shape-diamond', 'shape-arrow', 'shape-line'].includes(currentTool) || ((currentTool === 'pen' || currentTool === 'highlighter') && penMode === 'straight')) {
    isDrawingShape = true; startPx = pointer.x; startPy = pointer.y;
    let actStroke = getActiveStrokeColor(), actWidth = currentSize;
    if (currentTool === 'highlighter') { let cObj = new fabric.Color(actStroke); actStroke = cObj.setAlpha(currentOpacity * 0.4).toRgba(); actWidth = currentSize * 5; }
    
    const opts = { 
      stroke: actStroke === 'transparent' ? 'transparent' : actStroke, 
      strokeWidth: actWidth, 
      fill: getFillColor(), 
      opacity: 1, 
      strokeDashArray: getDashArray(currentStyle, actWidth), 
      selectable: false, 
      evented: false, 
      strokeLineCap: 'round', 
      strokeLineJoin: 'round',
      strokeUniform: true
    };
    
    if (currentTool === 'shape-rect') { 
      activeShape = new fabric.Rect({ left: startPx, top: startPy, width: 0, height: 0, rx: 5, ry: 5, ...opts }); 
      canvas.add(activeShape); 
    } 
    else if (currentTool === 'shape-circle') { 
      activeShape = new fabric.Ellipse({ left: startPx, top: startPy, rx: 0, ry: 0, ...opts }); 
      canvas.add(activeShape); 
    } 
    else if (currentTool === 'shape-diamond') {
      activeShape = new fabric.Polygon([
        { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }
      ], { left: startPx, top: startPy, width: 0, height: 0, ...opts });
      canvas.add(activeShape); 
    }
    else if (currentTool === 'shape-arrow') {
      activeShape = new fabric.Line([startPx, startPy, startPx, startPy], { ...opts, fill: 'transparent' });
      activeArrowHead = new fabric.Triangle({ width: actWidth * 4, height: actWidth * 4, fill: actStroke, opacity: 1, left: startPx, top: startPy, originX: 'center', originY: 'center', selectable: false, evented: false, strokeUniform: true });
      canvas.add(activeShape, activeArrowHead);
    } else { 
      activeShape = new fabric.Line([startPx, startPy, startPx, startPy], { ...opts, fill: 'transparent' }); 
      canvas.add(activeShape); 
    }
  }
});

canvas.on('mouse:move', function(options) {
  if (isPanning) { var e = options.e; var vpt = canvas.viewportTransform; vpt[4] += e.clientX - lastPosX; vpt[5] += e.clientY - lastPosY; canvas.requestRenderAll(); lastPosX = e.clientX; lastPosY = e.clientY; return; }
  const pointer = canvas.getPointer(options.e);

  if (currentTool === 'laser' && isLaserDrawing) { 
    currentLaserPos = { x: pointer.x, y: pointer.y };
    const lastP = laserPoints[laserPoints.length - 1];
    if (!lastP || Math.hypot(pointer.x - lastP.x, pointer.y - lastP.y) >= 3) {
      laserPoints.push({ x: pointer.x, y: pointer.y, time: Date.now() });
    }
    return; 
  }

  // 획 지우개 드래그 시 삭제
  if (currentTool === 'eraser' && isErasingStroke) { 
    const target = canvas.findTarget(options.e, false); 
    if (target && !target.isLocked) {
      canvas.remove(target);
    } 
    return; 
  }
  
  if (!isDrawingShape || !activeShape) return;

  if (currentTool === 'shape-rect') {
    activeShape.set({ width: Math.abs(pointer.x - startPx), height: Math.abs(pointer.y - startPy) });
    if(pointer.x < startPx) activeShape.set({ left: pointer.x }); if(pointer.y < startPy) activeShape.set({ top: pointer.y });
  } else if (currentTool === 'shape-circle') {
    activeShape.set({ rx: Math.abs(pointer.x - startPx)/2, ry: Math.abs(pointer.y - startPy)/2 });
    if(pointer.x < startPx) activeShape.set({ left: pointer.x }); if(pointer.y < startPy) activeShape.set({ top: pointer.y });
  } else if (currentTool === 'shape-diamond') {
    let w = Math.abs(pointer.x - startPx);
    let h = Math.abs(pointer.y - startPy);
    let left = Math.min(startPx, pointer.x);
    let top = Math.min(startPy, pointer.y);
    activeShape.set({
      points: [
        { x: w / 2, y: 0 },
        { x: w, y: h / 2 },
        { x: w / 2, y: h },
        { x: 0, y: h / 2 }
      ],
      left: left,
      top: top,
      width: w,
      height: h,
      pathOffset: new fabric.Point(w / 2, h / 2)
    });
    activeShape.setCoords();
  } else if (currentTool === 'shape-arrow') {
    activeShape.set({ x2: pointer.x, y2: pointer.y }); activeArrowHead.set({ left: pointer.x, top: pointer.y });
    const dx = pointer.x - startPx, dy = pointer.y - startPy; activeArrowHead.set({ angle: (Math.atan2(dy, dx) * 180 / Math.PI) + 90 });
  } else { activeShape.set({ x2: pointer.x, y2: pointer.y }); }
  canvas.renderAll();
});

canvas.on('mouse:up', function() {
  if (isPanning) { isPanning = false; canvas.setViewportTransform(canvas.viewportTransform); updateMode(); return; }
  if (currentTool === 'laser') { 
    isLaserDrawing = false; 
    currentLaserPos = null;
    return; 
  }
  
  if (currentTool === 'eraser' && isErasingStroke) { 
    isErasingStroke = false; 
    saveHistory(true); 
    return; 
  }
  
  if (isDrawingShape && activeShape) {
    if (currentTool === 'shape-arrow' && activeArrowHead) {
      canvas.remove(activeShape, activeArrowHead);
      const arrowGroup = new fabric.Group([activeShape, activeArrowHead], { selectable: true, evented: true, strokeUniform: true }); 
      canvas.add(arrowGroup); activeArrowHead = null; finishDrawing(arrowGroup);
    } else { 
      activeShape.set({ selectable: true, evented: true }); 
      finishDrawing(activeShape); 
    }
  }
});

function finishDrawing(obj) {
  obj.setCoords(); isDrawingShape = false; activeShape = null;
  if (!isToolLocked) { resetToSelectTool(); canvas.setActiveObject(obj); } else { obj.set({ selectable: false, evented: false }); }
  saveHistory(true);
}

function renderLaser() {
  const now = Date.now();
  laserPoints = laserPoints.filter(p => now - p.time < 420); 
  canvas.requestRenderAll();
  if (isLaserDrawing || laserPoints.length > 0) {
    laserAnim = requestAnimationFrame(renderLaser);
  } else {
    laserAnim = null;
  }
}

canvas.on('after:render', function(opt) {
  if (laserPoints.length === 0 && !currentLaserPos) return;
  const ctx = opt.ctx;
  ctx.save();
  ctx.transform.apply(ctx, canvas.viewportTransform);

  const now = Date.now();
  const maxLife = 420;
  const beamWidth = Math.max(3, currentSize * 1.5);

  if (laserPoints.length >= 2) {
    const pts = laserPoints;
    const numSegments = Math.min(pts.length - 1, 4);
    const step = (pts.length - 1) / numSegments;

    ctx.lineJoin = 'round';
    ctx.lineCap = 'butt';

    for (let s = 0; s < numSegments; s++) {
      const idxStart = Math.floor(s * step);
      const idxEnd = Math.min(pts.length - 1, Math.floor((s + 1) * step));
      if (idxStart >= idxEnd) continue;

      const progress = Math.max(0.08, Math.min(1, 1 - (now - pts[idxEnd].time) / maxLife));
      const alpha = progress * 0.9;

      ctx.beginPath();
      ctx.moveTo(pts[idxStart].x, pts[idxStart].y);
      for (let i = idxStart; i < idxEnd; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2;
        const yc = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
      }
      ctx.lineTo(pts[idxEnd].x, pts[idxEnd].y);

      ctx.strokeStyle = `rgba(255, 45, 45, ${alpha})`;
      ctx.shadowColor = '#ff2222';
      ctx.shadowBlur = 8 * progress;
      ctx.lineWidth = beamWidth;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pts[idxStart].x, pts[idxStart].y);
      for (let i = idxStart; i < idxEnd; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2;
        const yc = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
      }
      ctx.lineTo(pts[idxEnd].x, pts[idxEnd].y);

      ctx.strokeStyle = `rgba(255, 240, 240, ${alpha * 0.95})`;
      ctx.shadowBlur = 0;
      ctx.lineWidth = Math.max(1, beamWidth * 0.35);
      ctx.stroke();
    }
  }

  if (isLaserDrawing && currentLaserPos) {
    ctx.shadowColor = '#ff1e1e';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ff3333';
    ctx.beginPath();
    ctx.arc(currentLaserPos.x, currentLaserPos.y, beamWidth * 0.75, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(currentLaserPos.x, currentLaserPos.y, beamWidth * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
});

document.getElementById('btn-image').addEventListener('click', () => document.getElementById('image-upload').click());
document.getElementById('image-upload').addEventListener('change', e => {
  const file = e.target.files[0]; if (!file) return; const reader = new FileReader();
  reader.onload = f => { 
    optimizeImage(f.target.result, (optUrl) => {
      fabric.Image.fromURL(optUrl, img => {
        img.scaleToWidth(Math.min(img.width, canvas.width / 2)); 
        img.set({
          left: canvas.width / 2, 
          top: canvas.height / 2, 
          originX: 'center', 
          originY: 'center',
          strokeUniform: true
        });
        canvas.add(img); 
        canvas.setActiveObject(img); 
        resetToSelectTool(); 
        saveHistory(true);
      });
    });
  }; 
  reader.readAsDataURL(file); 
  e.target.value = ''; 
});

window.addEventListener('paste', function(e) {
  const obj = canvas.getActiveObject(); if (obj && obj.isEditing) return;
  const items = (e.clipboardData || e.originalEvent.clipboardData)?.items;
  if (!items) return;
  for (let index in items) {
    if (items[index].kind === 'file' && items[index].type.startsWith('image/')) {
      const blob = items[index].getAsFile(); 
      const reader = new FileReader();
      reader.onload = f => { 
        optimizeImage(f.target.result, (optUrl) => {
          fabric.Image.fromURL(optUrl, img => {
            img.scaleToWidth(Math.min(img.width, canvas.width / 2)); 
            img.set({ 
              left: canvas.width / 2, 
              top: canvas.height / 2, 
              originX: 'center', 
              originY: 'center',
              strokeUniform: true
            });
            canvas.add(img); 
            canvas.setActiveObject(img); 
            saveHistory(true);
          });
        });
      }; 
      reader.readAsDataURL(blob); 
      e.preventDefault(); 
      break; 
    }
  }
});

function invertColor(val) {
  if (!val || val === 'transparent') return val;
  let str = val.toString().replace(/\s/g, '').toLowerCase();
  let isWhite = str === '#ffffff' || str === 'rgb(255,255,255)' || str.startsWith('rgba(255,255,255');
  let isBlack = str === '#111111' || str === '#000000' || str === 'rgb(17,17,17)' || str === 'rgb(0,0,0)' || str.startsWith('rgba(17,17,17') || str.startsWith('rgba(0,0,0');

  if (isWhite) {
    let match = str.match(/rgba\(\d+,\d+,\d+,([0-9.]+)\)/);
    if (match) return `rgba(17,17,17,${match[1]})`;
    return '#111111';
  }
  if (isBlack) {
    let match = str.match(/rgba\(\d+,\d+,\d+,([0-9.]+)\)/);
    if (match) return `rgba(255,255,255,${match[1]})`;
    return '#ffffff';
  }
  return val;
}

document.getElementById('btn-theme').addEventListener('click', (e) => {
  const themes = ['dark', 'green', 'light']; const icons = ['🌙', '🏫', '☀️'];
  let prevTheme = currentTheme;
  let currentIdx = themes.indexOf(currentTheme); currentIdx = (currentIdx + 1) % themes.length; currentTheme = themes[currentIdx];
  
  document.body.className = ''; let bgColor;
  if(currentTheme === 'dark') { bgColor = '#121212'; document.body.classList.add('dark-mode'); }
  else if(currentTheme === 'green') { bgColor = '#204a29'; document.body.classList.add('green-mode'); }
  else { bgColor = '#ffffff'; document.body.classList.add('light-mode'); }
  
  e.currentTarget.innerText = icons[currentIdx];
  canvas.setBackgroundColor(bgColor, canvas.renderAll.bind(canvas));
  
  let wasLight = (prevTheme === 'light');
  let isLight = (currentTheme === 'light');
  
  if (wasLight !== isLight) {
    let strPen = currentColor.toString().replace(/\s/g, '').toLowerCase();
    let isPenLightStr = strPen === '#111111' || strPen === '#000000' || strPen.startsWith('rgba(17,17,17') || strPen.startsWith('rgba(0,0,0');
    let isPenWhite = strPen === '#ffffff' || strPen.startsWith('rgba(255,255,255');
    if ((isLight && isPenWhite) || (!isLight && isPenLightStr)) currentColor = invertColor(currentColor);

    let strHigh = currentHighlighterColor.toString().replace(/\s/g, '').toLowerCase();
    let isHighLightStr = strHigh === '#111111' || strHigh === '#000000' || strHigh.startsWith('rgba(17,17,17') || strHigh.startsWith('rgba(0,0,0');
    let isHighWhite = strHigh === '#ffffff' || strHigh.startsWith('rgba(255,255,255');
    if ((isLight && isHighWhite) || (!isLight && isHighLightStr)) currentHighlighterColor = invertColor(currentHighlighterColor);
    
    let strFill = currentFillBase.toString().replace(/\s/g, '').toLowerCase();
    let isFillLightStr = strFill === '#111111' || strFill === '#000000' || strFill.startsWith('rgba(17,17,17') || strFill.startsWith('rgba(0,0,0');
    let isFillWhite = strFill === '#ffffff' || strFill.startsWith('rgba(255,255,255');
    if ((isLight && isFillWhite) || (!isLight && isFillLightStr)) currentFillBase = invertColor(currentFillBase);

    canvas.getObjects().forEach(obj => {
      if (obj.isStickyNote) return;
      if (obj.stroke) obj.set('stroke', invertColor(obj.stroke));
      if (['i-text', 'text', 'textbox'].includes(obj.type) && obj.fill) obj.set('fill', invertColor(obj.fill));
      if (['rect', 'circle', 'ellipse', 'polygon', 'triangle'].includes(obj.type) && obj.fill && obj.fill !== 'transparent') {
          obj.set('fill', invertColor(obj.fill));
      }
      if (obj.styles) { for (let line in obj.styles) { for (let char in obj.styles[line]) { let charStyle = obj.styles[line][char]; if (charStyle.fill) charStyle.fill = invertColor(charStyle.fill); } } }
    });

    document.querySelectorAll('.color-btn[data-target="stroke"], .color-btn[data-target="fill"]').forEach(b => {
        let bColor = b.getAttribute('data-color');
        if(bColor === '#ffffff' || bColor === '#111111') { 
            let newThemeColor = isLight ? '#111111' : '#ffffff';
            b.style.background = newThemeColor;
            b.setAttribute('data-color', newThemeColor);
            if (b.classList.contains('active')) {
               if (b.getAttribute('data-target') === 'stroke') handleColorChange('stroke', newThemeColor);
               if (b.getAttribute('data-target') === 'fill') handleColorChange('fill', newThemeColor);
            }
        }
    });
  }
  updateMode();
  canvas.renderAll();
});

function getFormattedDate() { const d = new Date(); const pad = (n) => String(n).padStart(2, '0'); return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`; }
document.getElementById('btn-screenshot').addEventListener('click', () => { const link = document.createElement('a'); link.download = `다크보드-${getFormattedDate()}.png`; link.href = canvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 }); link.click(); });

document.getElementById('btn-undo').addEventListener('click', () => { 
  flushHistoryDebounce();
  if (historyStep > 0) { 
    isHistoryProcessing = true; 
    historyStep--; 
    canvas.loadFromJSON(history[historyStep], () => { 
      canvas.renderAll(); 
      isHistoryProcessing = false; 
    }); 
  } 
});

document.getElementById('btn-redo').addEventListener('click', () => { 
  flushHistoryDebounce();
  if (historyStep < history.length - 1) { 
    isHistoryProcessing = true; 
    historyStep++; 
    canvas.loadFromJSON(history[historyStep], () => { 
      canvas.renderAll(); 
      isHistoryProcessing = false; 
    }); 
  } 
});

document.getElementById('btn-clear').addEventListener('click', () => { if (confirm(t('promptClear'))) { canvas.clear(); canvas.setBackgroundColor(currentTheme==='green'?'#204a29':(currentTheme==='dark'?'#121212':'#ffffff'), canvas.renderAll.bind(canvas)); saveHistory(true); } });
document.getElementById('btn-fullscreen').addEventListener('click', () => { if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(err => console.log(err)); else document.exitFullscreen(); });

// 몰입 모드
document.getElementById('toggle-ui-btn').addEventListener('click', () => {
  document.getElementById('ui-container').classList.add('hide-ui');
  document.getElementById('db-timer-widget').classList.add('hide-ui');
  document.getElementById('btn-restore-ui').style.display = 'flex';
});
document.getElementById('btn-restore-ui').addEventListener('click', () => {
  document.getElementById('ui-container').classList.remove('hide-ui');
  document.getElementById('db-timer-widget').classList.remove('hide-ui');
  document.getElementById('btn-restore-ui').style.display = 'none';
});

// 키보드 단축키
window.addEventListener('keydown', (e) => {
  const activeObj = canvas.getActiveObject();
  if (e.target.tagName === 'INPUT' || (activeObj && activeObj.isEditing)) return;
  if (e.code === 'Space') { e.preventDefault(); canvas.defaultCursor = 'grabbing'; return; }

  // 단축키 L 홀드 레이저 모드
  if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.key === 'l' || e.key === 'L')) {
    if (!e.repeat && !isLaserKeyHeld && currentTool !== 'laser') {
      isLaserKeyHeld = true;
      previousToolBeforeLaser = currentTool;
      currentTool = 'laser';
      document.querySelectorAll('.icon-btn[data-tool]').forEach(b => b.classList.remove('active'));
      document.querySelector('.icon-btn[data-tool="laser"]')?.classList.add('active');
      canvas.discardActiveObject();
      updateMode();
    }
    return;
  }

  // 개체 잠금 단축키 (Ctrl + L)
  if ((e.ctrlKey || e.metaKey) && (e.key === 'l' || e.key === 'L')) {
    e.preventDefault();
    toggleObjectLock();
    return;
  }

  if (e.key === 'v' || e.key === 'V') document.querySelector('[data-tool="select"]')?.click();
  if (e.key === 'p' || e.key === 'P') document.querySelector('[data-tool="pen"]')?.click();
  if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); const activeObjects = canvas.getActiveObjects(); if (activeObjects.length) { activeObjects.forEach(obj => { if (!obj.isLocked) canvas.remove(obj); }); canvas.discardActiveObject(); saveHistory(true); } }
  if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) { if (activeObj) activeObj.clone(function(cloned) { internalClipboard = cloned; }); }
  if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'V')) {
    if (internalClipboard) {
      internalClipboard.clone(function(clonedObj) {
        canvas.discardActiveObject(); clonedObj.set({ left: clonedObj.left + 20, top: clonedObj.top + 20, evented: true, isLocked: false, hasControls: true, lockMovementX: false, lockMovementY: false, lockRotation: false, lockScalingX: false, lockScalingY: false });
        if (clonedObj.type === 'activeSelection') { clonedObj.canvas = canvas; clonedObj.forEachObject(function(obj) { canvas.add(obj); }); clonedObj.setCoords(); } else { canvas.add(clonedObj); }
        internalClipboard.top += 20; internalClipboard.left += 20; canvas.setActiveObject(clonedObj); canvas.requestRenderAll(); saveHistory(true);
      });
    }
  }
  if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) { e.preventDefault(); document.getElementById('btn-undo')?.click(); }
  if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) { e.preventDefault(); document.getElementById('btn-redo')?.click(); }
});

// 단축키 L 키업 시 복귀
window.addEventListener('keyup', (e) => {
  if (e.code === 'Space' && !isPanning) { updateMode(); }
  if ((e.key === 'l' || e.key === 'L') && isLaserKeyHeld && previousToolBeforeLaser) {
    isLaserKeyHeld = false;
    currentTool = previousToolBeforeLaser;
    previousToolBeforeLaser = null;
    document.querySelectorAll('.icon-btn[data-tool]').forEach(b => b.classList.remove('active'));
    const targetBtn = (['shape-rect', 'shape-circle', 'shape-diamond', 'shape-arrow', 'shape-line'].includes(currentTool))
      ? document.getElementById('btn-shape-main')
      : document.querySelector(`.icon-btn[data-tool="${currentTool}"]`);
    targetBtn?.classList.add('active');
    updateMode();
  }
});

// 🌟 최적화 3: 창 전환 및 포커스 이탈 시 안전 초기화 (좀비 루프 방지)
window.addEventListener('blur', () => {
  isPanning = false;
  isDraggingUI = false;
  isDraggingTimer = false;
  isScalingTimer = false;
  isDrawingShape = false;
  activeShape = null;
  activeArrowHead = null;
  isErasingStroke = false;

  if (isLaserDrawing || isLaserKeyHeld) {
    isLaserDrawing = false;
    currentLaserPos = null;
    if (isLaserKeyHeld && previousToolBeforeLaser) {
      isLaserKeyHeld = false;
      currentTool = previousToolBeforeLaser;
      previousToolBeforeLaser = null;
      document.querySelectorAll('.icon-btn[data-tool]').forEach(b => b.classList.remove('active'));
      const targetBtn = (['shape-rect', 'shape-circle', 'shape-diamond', 'shape-arrow', 'shape-line'].includes(currentTool))
        ? document.getElementById('btn-shape-main')
        : document.querySelector(`.icon-btn[data-tool="${currentTool}"]`);
      targetBtn?.classList.add('active');
    }
  }
  if (laserAnim) {
    cancelAnimationFrame(laserAnim);
    laserAnim = null;
  }
  laserPoints = [];
  updateMode();
});

// 타이머 제어
const timerWidget = document.getElementById('db-timer-widget');
const timerResizer = document.getElementById('db-timer-resizer');
let isDraggingTimer = false, tsX, tsY, tiX, tiY;
let isScalingTimer = false, initialScale = 1, startScaleX;

document.getElementById('db-timer-handle').addEventListener('mousedown', (e) => { 
  isDraggingTimer = true; tsX = e.clientX; tsY = e.clientY; tiX = timerWidget.offsetLeft; tiY = timerWidget.offsetTop; timerWidget.style.right = 'auto'; 
});
timerResizer.addEventListener('mousedown', (e) => {
  isScalingTimer = true; startScaleX = e.clientX;
  const match = timerWidget.style.transform.match(/scale\(([^)]+)\)/);
  initialScale = match ? parseFloat(match[1]) : 1;
  e.stopPropagation();
});

window.addEventListener('mousemove', (e) => { 
  if(isDraggingTimer) { timerWidget.style.left = (tiX + e.clientX - tsX) + 'px'; timerWidget.style.top = (tiY + e.clientY - tsY) + 'px'; }
  if (isScalingTimer) {
    const dx = e.clientX - startScaleX; 
    const newScale = Math.max(0.5, Math.min(4, initialScale + (dx / 200)));
    timerWidget.style.transform = `scale(${newScale})`;
  }
});
window.addEventListener('mouseup', () => { isDraggingTimer = false; isScalingTimer = false; });

const tMin = document.getElementById('db-t-min'); const tSec = document.getElementById('db-t-sec');
let timerInterval = null; let timeLeft = 300; let originalTime = 300; 

function syncTimerInput() { tMin.value = String(Math.floor(timeLeft / 60)).padStart(2, '0'); tSec.value = String(timeLeft % 60).padStart(2, '0'); }

tMin.addEventListener('input', (e) => { let val = parseInt(e.target.value) || 0; timeLeft = val * 60 + (parseInt(tSec.value) || 0); originalTime = timeLeft; tMin.classList.remove('time-over'); tSec.classList.remove('time-over');});
tSec.addEventListener('input', (e) => { let val = parseInt(e.target.value) || 0; timeLeft = (parseInt(tMin.value) || 0) * 60 + val; originalTime = timeLeft; tMin.classList.remove('time-over'); tSec.classList.remove('time-over');});

document.getElementById('btn-timer').addEventListener('click', () => { timerWidget.style.display = timerWidget.style.display === 'flex' ? 'none' : 'flex'; });
document.getElementById('db-t-close').addEventListener('click', () => timerWidget.style.display = 'none');
document.getElementById('db-t-reset').addEventListener('click', () => {
  clearInterval(timerInterval); const playBtn = document.getElementById('db-t-play'); playBtn.innerText = t('timerStart'); playBtn.classList.add('primary');
  tMin.disabled = false; tSec.disabled = false; timeLeft = originalTime; syncTimerInput(); tMin.classList.remove('time-over'); tSec.classList.remove('time-over');
});

document.getElementById('db-t-play').addEventListener('click', (e) => {
  const btn = e.currentTarget;
  if(btn.innerText === t('timerStart')) {
    if(timeLeft <= 0) return;
    btn.innerText = t('timerPause'); btn.classList.remove('primary'); tMin.disabled = true; tSec.disabled = true; tMin.classList.remove('time-over'); tSec.classList.remove('time-over');
    timerInterval = setInterval(() => {
      if(timeLeft > 0) { timeLeft--; syncTimerInput(); }
      else {
        clearInterval(timerInterval); btn.innerText = t('timerStart'); btn.classList.add('primary');
        tMin.disabled = false; tSec.disabled = false; tMin.classList.add('time-over'); tSec.classList.add('time-over');
        alert(t('promptTimerEnd'));
      }
    }, 1000);
  } else { clearInterval(timerInterval); btn.innerText = t('timerStart'); btn.classList.add('primary'); tMin.disabled = false; tSec.disabled = false; }
});

updateMode();