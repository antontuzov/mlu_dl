/* ------------------------------------------------------------------ */
/*  Article content data — drives every /article/:slug page            */
/* ------------------------------------------------------------------ */

export interface FormulaSection {
  type: 'formula'
  math: string
  label?: string
  labelRu?: string
}

export interface TextSection {
  type: 'text'
  html: string // supports <strong>, <em>, <InfoTooltip />
  htmlRu?: string
}

export interface ChartSection {
  type: 'chart'
  chart: 'beeswarm' | 'bar' | 'line' | 'roc' | 'scatter' | 'area' | 'sigmoid' | 'tree' | 'forest' | 'heatmap' | 'architecture'
  title: string
  titleRu?: string
  description: string
  descriptionRu?: string
  interactive?: boolean
}

export interface TabSection {
  type: 'tabs'
  tabs: { label: string; content: ContentBlock[] }[]
}

export interface DefinitionBox {
  type: 'definition'
  title: string
  titleRu?: string
  math: string
  note?: string
  noteRu?: string
}

export interface InfoBox {
  type: 'info'
  variant: 'accent' | 'emerald' | 'amber'
  text: string
  textRu?: string
}

export type ContentBlock =
  | TextSection
  | FormulaSection
  | ChartSection
  | TabSection
  | DefinitionBox
  | InfoBox

export interface ArticleChapter {
  slug: string
  title: string
  titleRu: string
  subtitle: string
  subtitleRu: string
  authors: string
  date: string
  thumbnail: string
  sections: { heading: string; headingRu: string; blocks: ContentBlock[] }[]
  conclusion: string
  conclusionRu: string
  references: { title: string; authors: string; url: string }[]
}

/* ================================================================== */
/*  CHAPTERS                                                           */
/* ================================================================== */

const BASE = 'https://mlu-explain.github.io/assets/thumbnails'

export const chapters: ArticleChapter[] = [
  /* ---- 1. Neural Networks ---- */
  {
    slug: 'neural-networks',
    title: 'Neural Networks',
    titleRu: 'Нейронные сети',
    subtitle: 'The Building Blocks of Deep Learning',
    subtitleRu: 'Строительные блоки глубокого обучения',
    authors: 'Jared Wilber',
    date: 'March 2024',
    thumbnail: `${BASE}/thumbnail-neural-networks.jpg`,
    sections: [
      {
        heading: 'What is a Neural Network?',
        headingRu: 'Что такое нейронная сеть?',
        blocks: [
          { type: 'text', html: 'Neural networks are computational models inspired by the biological neural networks in the human brain. They consist of layers of interconnected nodes (<strong>neurons</strong>) that process information using connectionist approaches to computation.', htmlRu: 'Нейронные сети — это вычислительные модели, вдохновлённые биологическими нейронными сетями человеческого мозга. Они состоят из слоёв взаимосвязанных узлов (<strong>нейронов</strong>), которые обрабатывают информацию с использованием коннекционистских подходов к вычислениям.' },
          { type: 'text', html: 'Each connection (synapse) between neurons has a <strong>weight</strong> that is adjusted during learning. A neuron computes a weighted sum of its inputs, adds a bias, and passes the result through an <strong>activation function</strong>.', htmlRu: 'Каждое соединение (синапс) между нейронами имеет <strong>вес</strong>, который корректируется в процессе обучения. Нейрон вычисляет взвешенную сумму своих входов, добавляет смещение и пропускает результат через <strong>функцию активации</strong>.' },
          { type: 'formula', math: 'a = \\sigma\\!\\left(\\sum_{i=1}^{n} w_i x_i + b\\right)', label: 'Neuron output', labelRu: 'Выход нейрона' },
          { type: 'definition', title: 'Activation Function', titleRu: 'Функция активации', math: '\\sigma(z) = \\frac{1}{1 + e^{-z}}', note: 'The sigmoid function maps any input to a value between 0 and 1, introducing non-linearity.', noteRu: 'Сигмоидная функция отображает любой вход в значение от 0 до 1, вводя нелинейность.' },
        ],
      },
      {
        heading: 'Network Architecture',
        headingRu: 'Архитектура сети',
        blocks: [
          { type: 'text', html: 'A typical neural network consists of an <strong>input layer</strong>, one or more <strong>hidden layers</strong>, and an <strong>output layer</strong>. The depth (number of hidden layers) gives rise to the term "deep learning".', htmlRu: 'Типичная нейронная сеть состоит из <strong>входного слоя</strong>, одного или нескольких <strong>скрытых слоёв</strong> и <strong>выходного слоя</strong>. Глубина (количество скрытых слоёв) даёт название термину «глубокое обучение».' },
          { type: 'chart', chart: 'area', title: 'Layer Activations During Forward Pass', titleRu: 'Активации слоёв при прямом проходе', description: 'Visualizing how activations flow through the network layers', descriptionRu: 'Визуализация потока активаций через слои сети', interactive: true },
          { type: 'text', html: 'The network learns by adjusting weights to minimize a <strong>loss function</strong>. This process is called <strong>backpropagation</strong>, which uses the chain rule of calculus to compute gradients.', htmlRu: 'Сеть обучается, корректируя веса для минимизации <strong>функции потерь</strong>. Этот процесс называется <strong>обратным распространением ошибки</strong> (backpropagation) и использует цепное правило для вычисления градиентов.' },
          { type: 'formula', math: '\\frac{\\partial L}{\\partial w_{ij}} = \\frac{\\partial L}{\\partial a_j} \\cdot \\frac{\\partial a_j}{\\partial z_j} \\cdot \\frac{\\partial z_j}{\\partial w_{ij}}', label: 'Backpropagation chain rule', labelRu: 'Цепное правило обратного распространения' },
        ],
      },
      {
        heading: 'Training with Gradient Descent',
        headingRu: 'Обучение градиентным спуском',
        blocks: [
          { type: 'text', html: 'Gradient descent is the optimization algorithm used to update weights. It iteratively moves toward the minimum of the loss function.', htmlRu: 'Градиентный спуск — это алгоритм оптимизации, используемый для обновления весов. Он итеративно движется к минимуму функции потерь.' },
          { type: 'chart', chart: 'scatter', title: 'Loss Landscape & Optimization Path', titleRu: 'Ландшафт потерь и путь оптимизации', description: 'Watch gradient descent navigate the loss surface', descriptionRu: 'Наблюдайте, как градиентный спуск перемещается по поверхности потерь', interactive: true },
          { type: 'formula', math: 'w_{t+1} = w_t - \\eta \\nabla L(w_t)', label: 'Weight update rule', labelRu: 'Правило обновления весов' },
          { type: 'info', variant: 'accent', text: 'Choosing the right learning rate η is crucial — too large causes divergence, too small causes slow convergence.', textRu: 'Выбор правильного темпа обучения η критичен — слишком большой вызывает расходимость, слишком малый — медленную сходимость.' },
          { type: 'text', html: '<strong>Adam optimizer</strong> combines the benefits of momentum and RMSProp, maintaining per-parameter adaptive learning rates. It is the default optimizer for most deep learning tasks.', htmlRu: '<strong>Оптимизатор Adam</strong> объединяет преимущества момента и RMSProp, поддерживая адаптивные темпы обучения для каждого параметра. Это оптимизатор по умолчанию для большинства задач глубокого обучения.' },
          { type: 'formula', math: 'm_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t, \\quad v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2', label: 'Adam: momentum + adaptive LR', labelRu: 'Adam: момент + адаптивный LR' },
        ],
      },
    ],
    conclusion: 'Neural networks are the backbone of modern AI. From ChatGPT to Stable Diffusion, understanding their architecture and training process is essential for anyone working in machine learning today.',
    conclusionRu: 'Нейронные сети — основа современного ИИ. От ChatGPT до Stable Diffusion — понимание их архитектуры и процесса обучения необходимо каждому, кто работает в машинном обучении.',
    references: [
      { title: 'Deep Learning', authors: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', url: 'https://www.deeplearningbook.org/' },
      { title: 'Neural Networks and Deep Learning', authors: 'Michael Nielsen', url: 'http://neuralnetworksanddeeplearning.com/' },
    ],
  },

  /* ---- 2. Equality of Odds ---- */
  {
    slug: 'equality-of-odds',
    title: 'Equality Of Odds',
    titleRu: 'Равенство шансов',
    subtitle: 'A Visual Introduction to Measuring and Mitigating Bias in Machine Learning',
    subtitleRu: 'Визуальное введение в измерение и устранение смещений в машинном обучении',
    authors: 'Mia Mayer & Jared Wilber',
    date: 'April 2023',
    thumbnail: `${BASE}/thumbnail-equality-of-odds.jpg`,
    sections: [
      {
        heading: 'Defining Equalized Odds',
        headingRu: 'Определение равных шансов',
        blocks: [
          { type: 'text', html: 'The <em>Equalized Odds</em> (EO) fairness criterion aims to equalize the errors a model makes for different groups. EO considers the ground truth distribution of labels.', htmlRu: 'Критерий справедливости <em>равных шансов</em> (EO) направлен на уравнивание ошибок модели для различных групп. EO учитывает истинное распределение меток.' },
          { type: 'text', html: 'In a hiring scenario, a model could make a <strong>wrong rejection</strong> (rejecting a qualified candidate) or a <strong>wrong acceptance</strong> (accepting an unqualified candidate).', htmlRu: 'В сценарии найма модель может совершить <strong>ложный отказ</strong> (отклонить квалифицированного кандидата) или <strong>ложное принятие</strong> (принять неквалифицированного кандидата).' },
          { type: 'formula', math: 'P(\\hat{Y}=1 \\mid Y=y,\\; A=\\blacksquare) = P(\\hat{Y}=1 \\mid Y=y,\\; A=\\square), \\quad y \\in \\{0,1\\}', label: 'EO Definition', labelRu: 'Определение EO' },
          { type: 'definition', title: 'False Positive Rate Balance', titleRu: 'Баланс ложноположительных', math: '\\text{FPR}_{\\blacksquare} - \\text{FPR}_{\\square}', note: 'Range [-1, 1]. Closer to 0 means more fair.', noteRu: 'Диапазон [-1, 1]. Ближе к 0 означает более справедливый.' },
        ],
      },
      {
        heading: 'Measuring Fairness',
        headingRu: 'Измерение справедливости',
        blocks: [
          { type: 'text', html: 'We compare error rates across groups. The key metrics are <strong>FPR</strong> (false positive rate) and <strong>FNR</strong> (false negative rate).', htmlRu: 'Мы сравниваем частоту ошибок по группам. Ключевые метрики — <strong>FPR</strong> (частота ложноположительных) и <strong>FNR</strong> (частота ложноотрицательных).' },
          { type: 'chart', chart: 'beeswarm', title: 'Interactive: Beeswarm Predictions', titleRu: 'Интерактив: Beeswarm-предсказания', description: 'Drag the threshold to change the probability cutoff', descriptionRu: 'Перетаскивайте порог для изменения границы вероятности', interactive: true },
          { type: 'chart', chart: 'bar', title: 'Outcomes by Group', titleRu: 'Результаты по группам', description: 'Count of TP, TN, FP, FN per group', descriptionRu: 'Подсчёт TP, TN, FP, FN для каждой группы' },
          { type: 'chart', chart: 'line', title: 'FPR/FNR by Threshold', titleRu: 'FPR/FNR по порогу', description: 'Comparing error rates across all thresholds', descriptionRu: 'Сравнение частот ошибок на всех порогах' },
        ],
      },
      {
        heading: 'Achieving Fairness',
        headingRu: 'Достижение справедливости',
        blocks: [
          { type: 'text', html: 'We can achieve EO through <strong>constrained optimization during training</strong> or via <strong>post-processing</strong>.', htmlRu: 'Достичь EO можно через <strong>оптимизацию с ограничениями при обучении</strong> или с помощью <strong>постобработки</strong>.' },
          { type: 'formula', math: '\\min_\\theta L(\\theta) \\quad \\text{s.t.} \\quad |P(\\hat{Y}\\neq Y, A{=}\\blacksquare) - P(\\hat{Y}\\neq Y, A{=}\\square)| \\leq \\varepsilon', label: 'Constrained optimization', labelRu: 'Оптимизация с ограничениями' },
          { type: 'chart', chart: 'roc', title: 'ROC Curves per Group', titleRu: 'ROC-кривые по группам', description: 'Where TPR and FPR match, EO is satisfied', descriptionRu: 'Где TPR и FPR совпадают — EO выполнено', interactive: true },
          { type: 'info', variant: 'emerald', text: 'When TPR and FPR match for both groups (neither are 0), Equalized Odds is satisfied.', textRu: 'Когда TPR и FPR совпадают для обеих групп (ни один не равен 0), равные шансы выполнены.' },
        ],
      },
    ],
    conclusion: 'Equality of Odds offers a principled approach to measuring and mitigating bias. Before using EO, carefully consider the context and potential trade-offs between competing objectives.',
    conclusionRu: 'Равенство шансов предлагает принципиальный подход к измерению и устранению смещений. Перед использованием EO тщательно учитывайте контекст и возможные компромиссы между конкурирующими целями.',
    references: [
      { title: 'Fairness and Machine Learning', authors: 'Barocas, Hardt, Narayanan', url: 'https://fairmlbook.org/' },
      { title: 'Equality of Opportunity in Supervised Learning', authors: 'Hardt, Price, Srebro, 2016', url: 'https://arxiv.org/abs/1610.02413' },
    ],
  },

  /* ---- 3. Logistic Regression ---- */
  {
    slug: 'logistic-regression',
    title: 'Logistic Regression',
    titleRu: 'Логистическая регрессия',
    subtitle: 'Binary Classification Through the Sigmoid Function',
    subtitleRu: 'Бинарная классификация через сигмоидную функцию',
    authors: 'Jared Wilber',
    date: 'February 2024',
    thumbnail: `${BASE}/thumbnail-logistic-regression.jpg`,
    sections: [
      {
        heading: 'The Sigmoid Function',
        headingRu: 'Сигмоидная функция',
        blocks: [
          { type: 'text', html: 'Logistic regression models the probability that an input belongs to a particular class using the <strong>sigmoid (logistic) function</strong>.', htmlRu: 'Логистическая регрессия моделирует вероятность принадлежности входа к определённому классу с помощью <strong>сигмоидной (логистической) функции</strong>.' },
          { type: 'formula', math: 'P(y=1 \\mid x) = \\frac{1}{1 + e^{-(w^Tx + b)}}', label: 'Sigmoid output', labelRu: 'Выход сигмоиды' },
          { type: 'chart', chart: 'sigmoid', title: 'Sigmoid Curve & Decision Boundary', titleRu: 'Сигмоидная кривая и граница решения', description: 'The S-shaped curve maps any input to a probability between 0 and 1', descriptionRu: 'S-образная кривая отображает любой вход в вероятность от 0 до 1', interactive: true },
          { type: 'text', html: 'The model learns the optimal weights <strong>w</strong> and bias <strong>b</strong> to separate classes.', htmlRu: 'Модель обучается оптимальным весам <strong>w</strong> и смещению <strong>b</strong> для разделения классов.' },
        ],
      },
      {
        heading: 'Log-Loss and Maximum Likelihood',
        headingRu: 'Лог-потеря и метод максимального правдоподобия',
        blocks: [
          { type: 'text', html: 'Unlike linear regression, logistic regression uses <strong>log-loss</strong> (cross-entropy) as its cost function, derived from maximum likelihood estimation.', htmlRu: 'В отличие от линейной регрессии, логистическая регрессия использует <strong>лог-потерю</strong> (кросс-энтропию) как функцию стоимости, выведенную из метода максимального правдоподобия.' },
          { type: 'formula', math: 'L(\\theta) = -\\frac{1}{m}\\sum_{i=1}^{m}[y_i\\log(h_\\theta(x_i)) + (1-y_i)\\log(1-h_\\theta(x_i))]', label: 'Cross-entropy loss', labelRu: 'Кросс-энтропийная потеря' },
          { type: 'chart', chart: 'area', title: 'Loss Surface During Training', titleRu: 'Поверхность потерь при обучении', description: 'How the loss decreases as the model learns', descriptionRu: 'Как уменьшается потеря по мере обучения модели', interactive: true },
          { type: 'text', html: 'The <strong>decision boundary</strong> of logistic regression is a linear hyperplane in the feature space. For non-linear boundaries, you must add polynomial features or use kernel methods.', htmlRu: '<strong>Граница решения</strong> логистической регрессии — линейная гиперплоскость в пространстве признаков. Для нелинейных границ необходимо добавить полиномиальные признаки или использовать ядерные методы.' },
        ],
      },
      {
        heading: 'Regularization and Multiclass',
        headingRu: 'Регуляризация и мультиклассовая классификация',
        blocks: [
          { type: 'text', html: 'To prevent overfitting, logistic regression commonly uses <strong>L2 regularization</strong> (C parameter in scikit-learn). For multiclass problems, <strong>One-vs-Rest</strong> or <strong>Softmax (multinomial)</strong> logistic regression extends the binary model.', htmlRu: 'Для предотвращения переобучения логистическая регрессия обычно использует <strong>L2-регуляризацию</strong> (параметр C в scikit-learn). Для мультиклассовых задач <strong>Один-против-всех</strong> или <strong>Softmax (мультиномиальная)</strong> логистическая регрессия расширяет бинарную модель.' },
          { type: 'formula', math: 'L_{reg}(\\theta) = L(\\theta) + \\frac{\\lambda}{2m}\\|\\theta\\|^2', label: 'Regularized logistic regression', labelRu: 'Регуляризованная логистическая регрессия' },
          { type: 'formula', math: 'P(y=k|x) = \\frac{e^{w_k^Tx + b_k}}{\\sum_{j=1}^{K} e^{w_j^Tx + b_j}}', label: 'Softmax (multiclass)', labelRu: 'Softmax (мультиклассовый)' },
          { type: 'info', variant: 'emerald', text: 'Logistic regression is often the best first model to try on a classification problem. Its coefficients are directly interpretable as log-odds ratios.', textRu: 'Логистическая регрессия часто является лучшей первой моделью для задачи классификации. Её коэффициенты напрямую интерпретируются как логарифмы отношений шансов.' },
        ],
      },
      {
        heading: 'Linear Models in Practice (Yandex ML Handbook)',
        headingRu: 'Линейные модели на практике (Хендбук Яндекса по ML)',
        blocks: [
          { type: 'text', html: 'Logistic regression belongs to the family of <strong>linear models</strong>, where the predicted value is computed as a weighted sum of input features. Despite the name, logistic regression solves <strong>classification</strong> tasks by modeling the probability that an object belongs to a given class.', htmlRu: 'Логистическая регрессия принадлежит к семейству <strong>линейных моделей</strong>, где предсказанное значение вычисляется как взвешенная сумма входных признаков. Несмотря на название, логистическая регрессия решает задачи <strong>классификации</strong>, моделируя вероятность принадлежности объекта к данному классу.' },
          { type: 'text', html: 'In supervised learning, every object in the training set has a known target value. The main goal is to train an algorithm that can <strong>predict the target variable</strong> for new, unseen objects. Linear models are among the most fundamental approaches, offering interpretability and computational efficiency.', htmlRu: 'В обучении с учителем каждому объекту из обучающей выборки соответствует известное целевое значение. Главная цель — обучить алгоритм, способный <strong>предсказывать целевую переменную</strong> для новых, ранее не виденных объектов. Линейные модели — одни из самых фундаментальных подходов, обеспечивающие интерпретируемость и вычислительную эффективность.' },
          { type: 'info', variant: 'accent', text: 'Linear models form the basis of both classification and regression. The key difference: linear regression predicts a continuous value, while logistic regression applies a sigmoid to predict class probabilities.', textRu: 'Линейные модели лежат в основе как классификации, так и регрессии. Ключевое различие: линейная регрессия предсказывает непрерывное значение, а логистическая регрессия применяет сигмоиду для предсказания вероятностей классов.' },
        ],
      },
    ],
    conclusion: 'Logistic regression remains one of the most widely used classification algorithms. Its simplicity, interpretability, and probabilistic output make it an excellent baseline model.',
    conclusionRu: 'Логистическая регрессия остаётся одним из самых популярных алгоритмов классификации. Её простота, интерпретируемость и вероятностный вывод делают её отличной базовой моделью.',
    references: [
      { title: 'Pattern Recognition and Machine Learning', authors: 'Christopher Bishop', url: 'https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/' },
      { title: 'Введение в ML — Классическое обучение с учителем (Хендбук Яндекса)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/vvedenie-glava-dva' },
    ],
  },

  /* ---- 4. Linear Regression ---- */
  {
    slug: 'linear-regression',
    title: 'Linear Regression',
    titleRu: 'Линейная регрессия',
    subtitle: 'Fitting Lines to Data with Least Squares',
    subtitleRu: 'Аппроксимация данных методом наименьших квадратов',
    authors: 'Jared Wilber',
    date: 'January 2024',
    thumbnail: `${BASE}/thumbnail-linear-regression.jpg`,
    sections: [
      {
        heading: 'The Linear Model',
        headingRu: 'Линейная модель',
        blocks: [
          { type: 'text', html: 'Linear regression models the relationship between a dependent variable and one or more independent variables using a <strong>linear equation</strong>.', htmlRu: 'Линейная регрессия моделирует связь между зависимой переменной и одним или несколькими независимыми переменными с помощью <strong>линейного уравнения</strong>.' },
          { type: 'formula', math: '\\hat{y} = w_1x_1 + w_2x_2 + \\ldots + w_nx_n + b', label: 'Linear prediction', labelRu: 'Линейное предсказание' },
          { type: 'chart', chart: 'scatter', title: 'Best-Fit Line with Confidence Intervals', titleRu: 'Линия наилучшего приближения с доверительными интервалами', description: 'The regression line minimizes the sum of squared residuals', descriptionRu: 'Линия регрессии минимизирует сумму квадратов остатков', interactive: true },
        ],
      },
      {
        heading: 'Ordinary Least Squares',
        headingRu: 'Метод наименьших квадратов',
        blocks: [
          { type: 'text', html: 'The <strong>OLS method</strong> finds the parameters that minimize the sum of squared differences between observed and predicted values.', htmlRu: '<strong>Метод наименьших квадратов (МНК)</strong> находит параметры, минимизирующие сумму квадратов разностей между наблюдаемыми и предсказанными значениями.' },
          { type: 'formula', math: '\\hat{w} = (X^TX)^{-1}X^Ty', label: 'OLS closed-form solution', labelRu: 'Замкнутое решение МНК' },
          { type: 'definition', title: 'R-squared', titleRu: 'Коэффициент детерминации R²', math: 'R^2 = 1 - \\frac{\\sum(y_i - \\hat{y}_i)^2}{\\sum(y_i - \\bar{y})^2}', note: 'Measures the proportion of variance explained by the model. Range: [0, 1].', noteRu: 'Измеряет долю дисперсии, объяснённую моделью. Диапазон: [0, 1].' },
          { type: 'text', html: 'OLS assumes: <strong>linearity</strong>, <strong>independence</strong> of errors, <strong>homoscedasticity</strong> (constant variance), and <strong>no multicollinearity</strong>. Violations of these assumptions require alternative methods like Ridge/Lasso regression.', htmlRu: 'МНК предполагает: <strong>линейность</strong>, <strong>независимость</strong> ошибок, <strong>гомоскедастичность</strong> (постоянная дисперсия) и <strong>отсутствие мультиколлинеарности</strong>. Нарушение этих допущений требует альтернативных методов — Ridge/Lasso-регрессии.' },
          { type: 'info', variant: 'emerald', text: 'Regularized variants: <strong>Ridge</strong> (L2) shrinks coefficients toward zero. <strong>Lasso</strong> (L1) performs feature selection by driving some coefficients exactly to zero. <strong>Elastic Net</strong> combines both.', textRu: 'Регуляризованные варианты: <strong>Ridge</strong> (L2) сжимает коэффициенты к нулю. <strong>Lasso</strong> (L1) выполняет отбор признаков, обнуляя некоторые коэффициенты. <strong>Elastic Net</strong> объединяет оба подхода.' },
        ],
      },
      {
        heading: 'Linear Regression & Supervised Learning (Yandex ML Handbook)',
        headingRu: 'Линейная регрессия и обучение с учителем (Хендбук Яндекса по ML)',
        blocks: [
          { type: 'text', html: 'Linear regression is a core <strong>supervised learning</strong> method where the target variable is a continuous real number. The model finds a linear combination of features that best approximates the observed target values using the <strong>least squares</strong> principle.', htmlRu: 'Линейная регрессия — основной метод <strong>обучения с учителем</strong>, где целевая переменная является непрерывным действительным числом. Модель находит линейную комбинацию признаков, наилучшим образом аппроксимирующую наблюдаемые целевые значения по принципу <strong>наименьших квадратов</strong>.' },
          { type: 'text', html: 'In the broader context of supervised learning, both classification and regression tasks share the same setup: given labeled training data, the algorithm learns a mapping from inputs to outputs. The difference lies in the nature of the target — <strong>discrete classes</strong> for classification, <strong>continuous values</strong> for regression.', htmlRu: 'В более широком контексте обучения с учителем задачи классификации и регрессии имеют одинаковую постановку: по размеченным обучающим данным алгоритм обучает отображение из входов в выходы. Разница в природе целевой переменной — <strong>дискретные классы</strong> для классификации, <strong>непрерывные значения</strong> для регрессии.' },
          { type: 'info', variant: 'accent', text: 'Linear models are interpretable: each weight shows how much the corresponding feature influences the prediction. This makes them valuable not only for prediction but also for understanding data relationships.', textRu: 'Линейные модели интерпретируемы: каждый вес показывает, насколько соответствующий признак влияет на предсказание. Это делает их ценными не только для предсказания, но и для понимания взаимосвязей в данных.' },
        ],
      },
    ],
    conclusion: 'Linear regression is the foundation upon which many advanced ML techniques are built. Understanding its assumptions and limitations is key to proper application.',
    conclusionRu: 'Линейная регрессия — фундамент многих продвинутых методов МО. Понимание её допущений и ограничений — ключ к правильному применению.',
    references: [
      { title: 'An Introduction to Statistical Learning', authors: 'James, Witten, Hastie, Tibshirani', url: 'https://www.statlearning.com/' },
      { title: 'Введение в ML — Классическое обучение с учителем (Хендбук Яндекса)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/vvedenie-glava-dva' },
    ],
  },

  /* ---- 5. Reinforcement Learning ---- */
  {
    slug: 'reinforcement-learning',
    title: 'Reinforcement Learning',
    titleRu: 'Обучение с подкреплением',
    subtitle: 'Learning Through Trial and Error in Interactive Environments',
    subtitleRu: 'Обучение методом проб и ошибок в интерактивных средах',
    authors: 'Jared Wilber',
    date: 'May 2023',
    thumbnail: `${BASE}/thumbnail-reinforcement-learning.jpg`,
    sections: [
      {
        heading: 'The RL Framework',
        headingRu: 'Фреймворк обучения с подкреплением',
        blocks: [
          { type: 'text', html: 'In reinforcement learning, an <strong>agent</strong> learns to make decisions by interacting with an <strong>environment</strong>. The agent receives <strong>rewards</strong> or <strong>penalties</strong> based on its actions.', htmlRu: 'В обучении с подкреплением <strong>агент</strong> учится принимать решения, взаимодействуя со <strong>средой</strong>. Агент получает <strong>награды</strong> или <strong>штрафы</strong> в зависимости от своих действий.' },
          { type: 'formula', math: 'G_t = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1}', label: 'Discounted return', labelRu: 'Дисконтированная награда' },
          { type: 'text', html: 'The <strong>exploration-exploitation dilemma</strong> is central to RL: should the agent exploit known good actions or explore potentially better ones?', htmlRu: '<strong>Дилемма исследования и эксплуатации</strong> — центральная проблема RL: агенту использовать известные хорошие действия или исследовать потенциально лучшие?' },
          { type: 'chart', chart: 'area', title: 'Grid World: Agent Learning Path', titleRu: 'Сеточный мир: путь обучения агента', description: 'Watch the agent learn optimal policies through interaction', descriptionRu: 'Наблюдайте, как агент обучает оптимальные стратегии через взаимодействие', interactive: true },
        ],
      },
      {
        heading: 'Q-Learning',
        headingRu: 'Q-обучение',
        blocks: [
          { type: 'text', html: 'Q-learning is a model-free algorithm that learns the value of taking an action in a given state.', htmlRu: 'Q-обучение — это безмодельный алгоритм, который обучает значение выполнения действия в данном состоянии.' },
          { type: 'formula', math: 'Q(s,a) \\leftarrow Q(s,a) + \\alpha[r + \\gamma \\max_{a\'} Q(s\',a\') - Q(s,a)]', label: 'Q-learning update rule', labelRu: 'Правило обновления Q-обучения' },
          { type: 'chart', chart: 'line', title: 'Q-Value Convergence Over Episodes', titleRu: 'Сходимость Q-значений по эпизодам', description: 'How Q-values stabilize as the agent learns', descriptionRu: 'Как Q-значения стабилизируются по мере обучения агента', interactive: true },
          { type: 'text', html: 'Modern RL often uses <strong>Deep Q-Networks (DQN)</strong>, where a neural network approximates the Q-function. Experience replay and target networks stabilize training.', htmlRu: 'Современное RL часто использует <strong>глубокие Q-сети (DQN)</strong>, где нейронная сеть аппроксимирует Q-функцию. Повторение опыта и целевые сети стабилизируют обучение.' },
          { type: 'info', variant: 'emerald', text: 'Policy gradient methods (REINFORCE, PPO, A3C) directly optimize the policy without learning a value function, making them suitable for continuous action spaces.', textRu: 'Методы градиента политики (REINFORCE, PPO, A3C) напрямую оптимизируют политику без обучения функции значения, что делает их подходящими для непрерывных пространств действий.' },
        ],
      },
    ],
    conclusion: 'Reinforcement learning powers some of AI\'s most impressive achievements, from game-playing to robotics. Understanding the exploration-exploitation tradeoff is key to building effective RL agents.',
    conclusionRu: 'Обучение с подкреплением обеспечивает одни из самых впечатляющих достижений ИИ — от игр до робототехники. Понимание компромисса «исследование vs. эксплуатация» — ключ к созданию эффективных RL-агентов.',
    references: [
      { title: 'Reinforcement Learning: An Introduction', authors: 'Richard Sutton & Andrew Barto', url: 'http://incompleteideas.net/book/the-book-2nd.html' },
    ],
  },

  /* ---- 6. ROC & AUC ---- */
  {
    slug: 'roc-auc',
    title: 'ROC & AUC',
    titleRu: 'ROC-кривая и AUC',
    subtitle: 'Visualizing Classifier Performance Across All Thresholds',
    subtitleRu: 'Визуализация качества классификатора на всех порогах',
    authors: 'Jared Wilber',
    date: 'June 2023',
    thumbnail: `${BASE}/thumbnail-roc-auc.jpg`,
    sections: [
      {
        heading: 'The ROC Curve',
        headingRu: 'ROC-кривая',
        blocks: [
          { type: 'text', html: 'The <strong>Receiver Operating Characteristic</strong> (ROC) curve plots the True Positive Rate against the False Positive Rate at various classification thresholds.', htmlRu: '<strong>ROC-кривая</strong> (Receiver Operating Characteristic) отображает зависимость истинно положительной частоты от ложноположительной на различных порогах классификации.' },
          { type: 'chart', chart: 'roc', title: 'Comparing ROC Curves', titleRu: 'Сравнение ROC-кривых', description: 'Perfect vs. Our vs. Random classifier', descriptionRu: 'Идеальный vs. наш vs. случайный классификатор', interactive: true },
          { type: 'definition', title: 'Area Under the Curve (AUC)', titleRu: 'Площадь под кривой (AUC)', math: '\\text{AUC} = \\int_0^1 \\text{TPR}(\\text{FPR})\\, d(\\text{FPR})', note: 'AUC = 1 means perfect classification. AUC = 0.5 means random guessing.', noteRu: 'AUC = 1 означает идеальную классификацию. AUC = 0.5 — случайное угадывание.' },
        ],
      },
      {
        heading: 'Interpreting AUC',
        headingRu: 'Интерпретация AUC',
        blocks: [
          { type: 'text', html: 'AUC represents the probability that a randomly chosen positive example is ranked higher than a randomly chosen negative example.', htmlRu: 'AUC представляет вероятность того, что случайно выбранный положительный пример ранжирован выше случайно выбранного отрицательного.' },
          { type: 'chart', chart: 'area', title: 'AUC Under Varying Class Distributions', titleRu: 'AUC при различных распределениях классов', description: 'How class imbalance affects the ROC curve', descriptionRu: 'Как дисбаланс классов влияет на ROC-кривую', interactive: true },
          { type: 'text', html: 'An AUC of <strong>0.9+</strong> is excellent, <strong>0.8-0.9</strong> is good, <strong>0.7-0.8</strong> is fair, and <strong>0.5</strong> is no better than random guessing. However, AUC alone can be misleading for imbalanced datasets — consider PR curves instead.', htmlRu: 'AUC <strong>0.9+</strong> — отлично, <strong>0.8–0.9</strong> — хорошо, <strong>0.7–0.8</strong> — удовлетворительно, <strong>0.5</strong> — не лучше случайного угадывания. Однако AUC может вводить в заблуждение при несбалансированных данных — используйте PR-кривые.' },
          { type: 'info', variant: 'emerald', text: 'When comparing two classifiers, prefer the one with higher AUC. But remember: AUC measures ranking quality, not calibration. A model can have perfect AUC but poorly calibrated probabilities.', textRu: 'При сравнении двух классификаторов предпочитайте тот, у которого выше AUC. Но помните: AUC измеряет качество ранжирования, а не калибровку. Модель может иметь идеальный AUC, но плохо калиброванные вероятности.' },
        ],
      },
    ],
    conclusion: 'The ROC curve and AUC provide a threshold-independent way to evaluate classifiers, making them invaluable for comparing models across different operating points.',
    conclusionRu: 'ROC-кривая и AUC обеспечивают независимый от порога способ оценки классификаторов, что делает их незаменимыми для сравнения моделей в различных рабочих режимах.',
    references: [
      { title: 'An Introduction to ROC Analysis', authors: 'Tom Fawcett, 2006', url: 'https://doi.org/10.1016/j.patrec.2005.10.010' },
    ],
  },

  /* ---- 7. Cross-Validation ---- */
  {
    slug: 'cross-validation',
    title: 'Cross-Validation',
    titleRu: 'Кросс-валидация',
    subtitle: 'K-Fold Resampling for Robust Model Evaluation',
    subtitleRu: 'K-блочная реорганизация для надёжной оценки модели',
    authors: 'Jared Wilber',
    date: 'July 2023',
    thumbnail: `${BASE}/thumbnail-cross-validation.jpg`,
    sections: [
      {
        heading: 'Why Cross-Validation?',
        headingRu: 'Зачем нужна кросс-валидация?',
        blocks: [
          { type: 'text', html: 'A single train/test split can give a misleading estimate of model performance. <strong>K-Fold Cross-Validation</strong> provides a more robust evaluation by averaging over multiple splits.', htmlRu: 'Одно разбиение на обучающую/тестовую выборки может дать неточную оценку качества модели. <strong>K-блочная кросс-валидация</strong> обеспечивает более надёжную оценку за счёт усреднения по нескольким разбиениям.' },
          { type: 'chart', chart: 'bar', title: 'K-Fold Split Visualization', titleRu: 'Визуализация K-блочного разбиения', description: 'How data is partitioned across K folds', descriptionRu: 'Как данные разделяются на K блоков', interactive: true },
          { type: 'formula', math: '\\hat{E}_{CV} = \\frac{1}{K}\\sum_{k=1}^{K} E_k', label: 'CV error estimate', labelRu: 'Оценка ошибки кросс-валидации' },
          { type: 'text', html: 'The idea is simple: divide your data into K equal parts. Train on K-1 folds and test on the remaining fold. Repeat K times, each time holding out a different fold. The final metric is the average across all K runs.', htmlRu: 'Идея проста: разделите данные на K равных частей. Обучайте на K-1 блоках и тестируйте на оставшемся. Повторите K раз, каждый раз оставляя другой блок. Итоговая метрика — среднее по всем K запускам.' },
        ],
      },
      {
        heading: 'Variants of Cross-Validation',
        headingRu: 'Варианты кросс-валидации',
        blocks: [
          { type: 'text', html: '<strong>Stratified K-Fold</strong> preserves the class distribution in each fold — essential for imbalanced datasets. <strong>Leave-One-Out (LOO)</strong> uses K = N, giving an almost unbiased estimate but at high computational cost.', htmlRu: '<strong>Стратифицированная K-блочная</strong> сохраняет распределение классов в каждом блоке — необходимо для несбалансированных данных. <strong>Leave-One-Out (LOO)</strong> использует K = N, давая почти несмещённую оценку, но с высокими вычислительными затратами.' },
          { type: 'formula', math: '\\text{LOO}: \\hat{E} = \\frac{1}{N}\\sum_{i=1}^{N} L(y_i, \\hat{f}_{-i}(x_i))', label: 'Leave-One-Out error', labelRu: 'Ошибка Leave-One-Out' },
          { type: 'text', html: 'For <strong>time-series data</strong>, standard K-Fold is invalid due to temporal leakage. Use <strong>expanding window</strong> or <strong>rolling window</strong> CV instead, where the test set always comes after the training set in time.', htmlRu: 'Для <strong>временных рядов</strong> стандартная K-блочная невалидна из-за временной утечки. Используйте <strong>расширяющееся окно</strong> или <strong>скользящее окно</strong>, где тестовая выборка всегда идёт после обучающей по времени.' },
          { type: 'info', variant: 'accent', text: 'K=5 or K=10 are standard choices. K=5 gives slightly higher bias but lower variance in the error estimate; K=10 is more computationally expensive but often more accurate.', textRu: 'K=5 или K=10 — стандартный выбор. K=5 даёт чуть большее смещение, но меньшую дисперсию оценки ошибки; K=10 дороже вычислительно, но часто точнее.' },
          { type: 'definition', title: 'Repeated K-Fold', titleRu: 'Повторная K-блочная', math: '\\text{Repeat K-Fold } R \\text{ times with different random splits}', note: 'Reduces variance in the CV estimate. Common: 5-fold × 5 repeats = 25 total fits.', noteRu: 'Уменьшает дисперсию оценки кросс-валидации. Обычно: 5-блочная × 5 повторений = 25 запусков.' },
        ],
      },
    ],
    conclusion: 'Cross-validation is essential for model selection and hyperparameter tuning, providing a more reliable estimate of how your model will generalize to unseen data.',
    conclusionRu: 'Кросс-валидация необходима для выбора модели и настройки гиперпараметров, обеспечивая более надёжную оценку того, как модель будет работать на новых данных.',
    references: [
      { title: 'An Introduction to Statistical Learning', authors: 'James, Witten, Hastie, Tibshirani', url: 'https://www.statlearning.com/' },
    ],
  },

  /* ---- 8. Train, Test, Validation ---- */
  {
    slug: 'train-test-validation',
    title: 'Train, Test, and Validation Sets',
    titleRu: 'Обучающая, тестовая и валидационная выборки',
    subtitle: 'Why Data Splitting Matters for Model Evaluation',
    subtitleRu: 'Почему разделение данных важно для оценки модели',
    authors: 'Jared Wilber',
    date: 'August 2023',
    thumbnail: `${BASE}/thumbnail-train-test-validation.jpg`,
    sections: [
      {
        heading: 'The Three Splits',
        headingRu: 'Три выборки',
        blocks: [
          { type: 'text', html: 'Proper data splitting is crucial: the <strong>training set</strong> teaches the model, the <strong>validation set</strong> tunes hyperparameters, and the <strong>test set</strong> provides an unbiased performance estimate.', htmlRu: 'Правильное разделение данных критично: <strong>обучающая выборка</strong> обучает модель, <strong>валидационная</strong> настраивает гиперпараметры, а <strong>тестовая</strong> даёт несмещённую оценку качества.' },
          { type: 'chart', chart: 'bar', title: 'Performance Across Data Splits', titleRu: 'Качество по различным выборкам', description: 'How models perform on train vs. validation vs. test data', descriptionRu: 'Как модель работает на обучающей vs. валидационной vs. тестовой выборке', interactive: true },
          { type: 'info', variant: 'accent', text: 'Never tune hyperparameters on the test set — this leads to overly optimistic performance estimates and poor generalization.', textRu: 'Никогда не настраивайте гиперпараметры на тестовой выборке — это даёт завышенные оценки качества и плохое обобщение.' },
          { type: 'text', html: 'A common starting point is a <strong>60/20/20</strong> or <strong>70/15/15</strong> split. With very large datasets (>1M samples), even a 98/1/1 split can provide enough data for validation and testing.', htmlRu: 'Обычная отправная точка — разбиение <strong>60/20/20</strong> или <strong>70/15/15</strong>. С очень большими данными (>1M примеров) даже разбиение 98/1/1 обеспечивает достаточно данных для валидации и тестирования.' },
        ],
      },
      {
        heading: 'Data Leakage & Common Pitfalls',
        headingRu: 'Утечка данных и типичные ошибки',
        blocks: [
          { type: 'text', html: '<strong>Data leakage</strong> occurs when information from the test/validation set inadvertently influences training. Common sources include: preprocessing on the entire dataset before splitting, duplicate samples across splits, and temporal leakage in time-series data.', htmlRu: '<strong>Утечка данных</strong> возникает, когда информация из тестовой/валидационной выборки невольно влияет на обучение. Частые источники: предобработка всего набора данных до разделения, дубликаты между выборками и временная утечка в данных временных рядов.' },
          { type: 'definition', title: 'Correct Preprocessing Order', titleRu: 'Правильный порядок предобработки', math: '\\text{1. Split} \\to \\text{2. Fit scaler on train} \\to \\text{3. Transform all}', note: 'Always fit preprocessing (scalers, imputers, encoders) on the training set only, then transform validation/test.', noteRu: 'Всегда обучайте предобработку (скейлеры, импьютеры, энкодеры) только на обучающей выборке, затем трансформируйте валидацию/тест.' },
          { type: 'chart', chart: 'area', title: 'Learning Curves: Train vs. Validation Error', titleRu: 'Кривые обучения: ошибка на обучении vs. валидации', description: 'Diagnose underfitting and overfitting from learning curves', descriptionRu: 'Диагностика недообучения и переобучения по кривым обучения', interactive: true },
          { type: 'info', variant: 'amber', text: 'For time-series data, use temporal splitting (train on past, test on future) rather than random shuffling. Random splits can leak future information into the training set.', textRu: 'Для временных рядов используйте временное разбиение (обучение на прошлом, тест на будущем), а не случайное перемешивание. Случайные разбиения могут пропустить будущую информацию в обучающую выборку.' },
        ],
      },
    ],
    conclusion: 'The train/validation/test split is the foundation of rigorous ML evaluation. Each set serves a distinct purpose in the model development pipeline.',
    conclusionRu: 'Разделение на обучающую/валидационную/тестовую выборки — основа строгой оценки ML-моделей. Каждая выборка выполняет свою функцию в процессе разработки.',
    references: [
      { title: 'Elements of Statistical Learning', authors: 'Hastie, Tibshirani, Friedman', url: 'https://hastie.su.domains/ElemStatLearn/' },
    ],
  },

  /* ---- 9. Precision & Recall ---- */
  {
    slug: 'precision-recall',
    title: 'Precision & Recall',
    titleRu: 'Точность и полнота',
    subtitle: 'Beyond Accuracy: Evaluating Classification Models',
    subtitleRu: 'За рамками accuracy: оценка классификационных моделей',
    authors: 'Jared Wilber',
    date: 'September 2023',
    thumbnail: `${BASE}/thumbnail-precision-recall.jpg`,
    sections: [
      {
        heading: 'The Confusion Matrix',
        headingRu: 'Матрица ошибок',
        blocks: [
          { type: 'text', html: 'The <strong>confusion matrix</strong> summarizes the performance of a classification model by counting true positives, true negatives, false positives, and false negatives.', htmlRu: '<strong>Матрица ошибок</strong> суммирует качество классификационной модели, подсчитывая истинно положительные, истинно отрицательные, ложноположительные и ложноотрицательные.' },
          { type: 'formula', math: '\\text{Precision} = \\frac{TP}{TP + FP}, \\quad \\text{Recall} = \\frac{TP}{TP + FN}', label: 'Precision & Recall', labelRu: 'Точность и полнота' },
          { type: 'definition', title: 'F1 Score', titleRu: 'F1-мера', math: 'F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}', note: 'The harmonic mean of precision and recall. Balances both concerns.', noteRu: 'Гармоническое среднее точности и полноты. Балансирует обе задачи.' },
          { type: 'chart', chart: 'bar', title: 'Precision-Recall Trade-off', titleRu: 'Компромисс точности и полноты', description: 'How changing the threshold affects precision and recall', descriptionRu: 'Как изменение порога влияет на точность и полноту', interactive: true },
          { type: 'text', html: 'High precision means few false positives (important for spam detection). High recall means few false negatives (critical for disease diagnosis). The <strong>F1 score</strong> balances both concerns as their harmonic mean.', htmlRu: 'Высокая точность означает мало ложноположительных (важно для детекции спама). Высокая полнота — мало ложноотрицательных (критично для диагностики заболеваний). <strong>F1-мера</strong> балансирует обе задачи как их гармоническое среднее.' },
        ],
      },
      {
        heading: 'Precision-Recall Curves',
        headingRu: 'PR-кривые',
        blocks: [
          { type: 'text', html: 'The <strong>PR curve</strong> plots Precision vs. Recall at all thresholds. Unlike ROC, PR curves are sensitive to class imbalance, making them more informative for imbalanced datasets.', htmlRu: '<strong>PR-кривая</strong> отображает точность vs. полноту на всех порогах. В отличие от ROC, PR-кривые чувствительны к дисбалансу классов, что делает их более информативными для несбалансированных данных.' },
          { type: 'chart', chart: 'roc', title: 'Precision-Recall Curve Comparison', titleRu: 'Сравнение PR-кривых', description: 'Comparing PR curves for balanced vs. imbalanced datasets', descriptionRu: 'Сравнение PR-кривых для сбалансированных vs. несбалансированных данных', interactive: true },
          { type: 'definition', title: 'Average Precision (AP)', titleRu: 'Средняя точность (AP)', math: 'AP = \\sum_n (R_n - R_{n-1}) P_n', note: 'The area under the PR curve. A single-number summary of classifier quality across all thresholds.', noteRu: 'Площадь под PR-кривой. Единичная метрика качества классификатора на всех порогах.' },
          { type: 'info', variant: 'emerald', text: 'When classes are heavily imbalanced (e.g., 1% positive), prefer PR curves over ROC curves. A high AUC-ROC can mask poor precision on the minority class.', textRu: 'При сильном дисбалансе классов (напр., 1% положительных) предпочитайте PR-кривые ROC-кривым. Высокий AUC-ROC может скрыть плохую точность на миноритарном классе.' },
        ],
      },
    ],
    conclusion: 'When accuracy is misleading (e.g., imbalanced datasets), precision and recall provide a much clearer picture of model performance.',
    conclusionRu: 'Когда accuracy вводит в заблуждение (например, при несбалансированных данных), точность и полнота дают гораздо более ясную картину качества модели.',
    references: [
      { title: 'The Relationship Between Precision-Recall and ROC Curves', authors: 'Davis & Goadrich, 2006', url: 'https://doi.org/10.1145/1143844.1143874' },
    ],
  },

  /* ---- 10. Random Forest ---- */
  {
    slug: 'random-forest',
    title: 'Random Forest',
    titleRu: 'Случайный лес',
    subtitle: 'The Power of Ensemble Learning',
    subtitleRu: 'Сила ансамблевого обучения',
    authors: 'Jared Wilber',
    date: 'October 2023',
    thumbnail: `${BASE}/thumbnail-random-forest.jpg`,
    sections: [
      {
        heading: 'Ensemble of Decision Trees',
        headingRu: 'Ансамбль решающих деревьев',
        blocks: [
          { type: 'text', html: 'A <strong>Random Forest</strong> builds many decision trees on random subsets of the data and combines their predictions through <strong>majority voting</strong> (classification) or <strong>averaging</strong> (regression).', htmlRu: '<strong>Случайный лес</strong> строит множество решающих деревьев на случайных подвыборках данных и объединяет их предсказания через <strong>мажоритарное голосование</strong> (классификация) или <strong>усреднение</strong> (регрессия).' },
          { type: 'chart', chart: 'forest', title: 'Forest of Trees Voting', titleRu: 'Голосование леса деревьев', description: 'How multiple trees combine for a robust prediction', descriptionRu: 'Как несколько деревьев объединяются для надёжного предсказания', interactive: true },
          { type: 'formula', math: '\\hat{y} = \\frac{1}{B}\\sum_{b=1}^{B} T_b(x)', label: 'Forest prediction (regression)', labelRu: 'Предсказание леса (регрессия)' },
          { type: 'text', html: 'The randomness introduced by <strong>bagging</strong> (bootstrap aggregating) and <strong>feature subsetting</strong> reduces overfitting compared to individual trees.', htmlRu: 'Случайность, вносимая <strong>бэггингом</strong> (бутстрап-агрегирование) и <strong>подмножеством признаков</strong>, уменьшает переобучение по сравнению с отдельными деревьями.' },
          { type: 'text', html: 'Random Forest also provides built-in <strong>feature importance</strong> scores, measuring how much each feature reduces impurity across all trees. This is invaluable for feature selection and model interpretability.', htmlRu: 'Случайный лес также предоставляет встроенные оценки <strong>важности признаков</strong>, измеряя, насколько каждый признак уменьшает неопределённость по всем деревьям. Это бесценно для отбора признаков и интерпретируемости модели.' },
          { type: 'definition', title: 'Out-of-Bag (OOB) Error', titleRu: 'Ошибка Out-of-Bag (OOB)', math: '\\hat{E}_{OOB} = \\frac{1}{N}\\sum_{i=1}^{N} L(y_i, \\hat{f}_{-i}(x_i))', note: 'Each sample is held out from ~37% of trees. OOB error is a free cross-validation estimate — no separate validation set needed.', noteRu: 'Каждый пример исключён из ~37% деревьев. OOB-ошибка — бесплатная оценка кросс-валидации — без отдельной валидационной выборки.' },
        ],
      },
      {
        heading: 'Hyperparameter Tuning',
        headingRu: 'Настройка гиперпараметров',
        blocks: [
          { type: 'text', html: 'Key hyperparameters include: <strong>number of trees</strong> (more = better, diminishing returns), <strong>max depth</strong> (controls overfitting), <strong>min samples per leaf</strong> (regularization), and <strong>max features per split</strong> (diversity).', htmlRu: 'Ключевые гиперпараметры: <strong>количество деревьев</strong> (больше = лучше, но убывающая отдача), <strong>максимальная глубина</strong> (контроль переобучения), <strong>мин. примеров на лист</strong> (регуляризация) и <strong>макс. признаков на разделение</strong> (разнообразие).' },
          { type: 'chart', chart: 'area', title: 'Performance vs. Number of Trees', titleRu: 'Качество vs. количество деревьев', description: 'How accuracy improves as more trees are added', descriptionRu: 'Как улучшается точность при добавлении деревьев', interactive: true },
          { type: 'info', variant: 'emerald', text: 'Random Forest rarely overfits with more trees. Start with 100-500 trees and increase if needed. The main cost is memory and inference time, not overfitting.', textRu: 'Случайный лес редко переобучается с ростом числа деревьев. Начните со 100–500 и увеличивайте при необходимости. Основная стоимость — память и время инференса, а не переобучение.' },
          { type: 'text', html: 'As the Yandex ML Handbook explains, ensemble methods like Random Forest combine multiple models to achieve <strong>higher accuracy and stability</strong> than any individual model. Bagging and feature subsetting compensate for the weaknesses of individual base models, making Random Forest one of the most robust approaches in classical ML.', htmlRu: 'Как объясняет хендбук Яндекса по ML, ансамблевые методы, такие как случайный лес, объединяют несколько моделей для достижения <strong>более высокой точности и устойчивости</strong>, чем любая отдельная модель. Бэггинг и подмножество признаков компенсируют слабости отдельных базовых моделей, делая случайный лес одним из самых надёжных подходов в классическом ML.' },
          { type: 'formula', math: '\\text{Importance}(j) = \\frac{1}{B}\\sum_{b=1}^{B} \\sum_{t \\in T_b: v(t)=j} \\Delta I(t)', label: 'Feature importance (mean decrease in impurity)', labelRu: 'Важность признака (среднее уменьшение неопределённости)' },
        ],
      },
    ],
    conclusion: 'Random Forest is one of the most widely-used and robust ML algorithms. Its ability to handle high-dimensional data with minimal tuning makes it a go-to choice for many practitioners.',
    conclusionRu: 'Случайный лес — один из самых популярных и надёжных алгоритмов МО. Его способность работать с многомерными данными при минимальной настройке делает его выбором номер один для многих специалистов.',
    references: [
      { title: 'Random Forests', authors: 'Leo Breiman, 2001', url: 'https://doi.org/10.1023/A:1010933404324' },
      { title: 'Введение в ML — Ансамбли и градиентный бустинг (Хендбук Яндекса)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/vvedenie-glava-dva' },
    ],
  },

  /* ---- 11. Decision Trees ---- */
  {
    slug: 'decision-trees',
    title: 'Decision Trees',
    titleRu: 'Решающие деревья',
    subtitle: 'Splitting Data with Entropy and Information Gain',
    subtitleRu: 'Разделение данных по энтропии и приросту информации',
    authors: 'Jared Wilber',
    date: 'November 2023',
    thumbnail: `${BASE}/thumbnail-decision-tree.jpg`,
    sections: [
      {
        heading: 'How Trees Split Data',
        headingRu: 'Как деревья разделяют данные',
        blocks: [
          { type: 'text', html: 'Decision trees recursively partition the feature space by choosing the split that maximizes <strong>information gain</strong> — the reduction in uncertainty.', htmlRu: 'Решающие деревья рекурсивно разделяют пространство признаков, выбирая разделение, максимизирующее <strong>прирост информации</strong> — уменьшение неопределённости.' },
          { type: 'formula', math: 'H(S) = -\\sum_{i=1}^{c} p_i \\log_2 p_i', label: 'Entropy', labelRu: 'Энтропия' },
          { type: 'formula', math: 'IG(S, A) = H(S) - \\sum_{v \\in A} \\frac{|S_v|}{|S|} H(S_v)', label: 'Information Gain', labelRu: 'Прирост информации' },
          { type: 'chart', chart: 'tree', title: 'Interactive Decision Tree', titleRu: 'Интерактивное решающее дерево', description: 'Watch the tree grow and split the data', descriptionRu: 'Наблюдайте, как дерево растёт и разделяет данные', interactive: true },
          { type: 'info', variant: 'amber', text: 'Going too deep leads to overfitting. Pruning and max-depth constraints are essential regularization techniques.', textRu: 'Слишком глубокие деревья ведут к переобучению. Обрезка и ограничения максимальной глубины — необходимые методы регуляризации.' },
          { type: 'text', html: 'Decision trees can use either <strong>entropy</strong> or <strong>Gini impurity</strong> as the splitting criterion. In practice, they produce similar trees — Gini is faster to compute.', htmlRu: 'Решающие деревья могут использовать <strong>энтропию</strong> или <strong>критерий Джини</strong> как критерий разделения. На практике они дают похожие деревья — Джини быстрее вычисляется.' },
          { type: 'formula', math: '\\text{Gini}(S) = 1 - \\sum_{i=1}^{c} p_i^2', label: 'Gini Impurity', labelRu: 'Критерий Джини' },
        ],
      },
      {
        heading: 'Pruning and Regularization',
        headingRu: 'Обрезка и регуляризация',
        blocks: [
          { type: 'text', html: 'Unconstrained trees will memorize the training data perfectly. <strong>Pre-pruning</strong> stops growth early (max depth, min samples per split). <strong>Post-pruning</strong> (cost-complexity pruning) grows the full tree then removes branches that don\'t improve validation performance.', htmlRu: 'Неограниченные деревья идеально запомнят обучающие данные. <strong>Предобрезка</strong> останавливает рост рано (макс. глубина, мин. примеров на разделение). <strong>Постобрезка</strong> (обрезка по сложности) строит полное дерево, затем удаляет ветви, не улучшающие качество на валидации.' },
          { type: 'formula', math: 'C_\\alpha(T) = \\sum_{m=1}^{|T|} N_m Q_m(T) + \\alpha |T|', label: 'Cost-complexity pruning (CART)', labelRu: 'Обрезка по сложности (CART)' },
          { type: 'chart', chart: 'line', title: 'Tree Depth vs. Train/Test Accuracy', titleRu: 'Глубина дерева vs. точность на обучении/тесте', description: 'The overfitting effect of increasing tree depth', descriptionRu: 'Эффект переобучения при увеличении глубины дерева', interactive: true },
          { type: 'info', variant: 'accent', text: 'Decision trees are the building blocks of the most powerful ML algorithms: Random Forest, Gradient Boosting (XGBoost, LightGBM), and AdaBoost all combine trees into ensembles.', textRu: 'Решающие деревья — строительные блоки самых мощных алгоритмов МО: случайный лес, градиентный бустинг (XGBoost, LightGBM) и AdaBoost объединяют деревья в ансамбли.' },
        ],
      },
      {
        heading: 'Trees, Ensembles & Boosting (Yandex ML Handbook)',
        headingRu: 'Деревья, ансамбли и бустинг (Хендбук Яндекса по ML)',
        blocks: [
          { type: 'text', html: 'Decision trees build a complex decision surface through <strong>hierarchical partitioning</strong> of the feature space. This process is intuitive and mimics the natural human decision-making mechanism, making these models <strong>highly interpretable</strong>.', htmlRu: 'Решающие деревья строят сложную решающую поверхность путём <strong>иерархического разделения</strong> пространства признаков. Этот процесс интуитивно понятен и имитирует естественный для человека механизм принятия решений, что делает такие модели <strong>хорошо интерпретируемыми</strong>.' },
          { type: 'text', html: 'The Yandex ML Handbook highlights several ensemble techniques built on trees: <strong>Bagging</strong> trains models independently on random subsets and averages predictions. <strong>Stacking</strong> combines predictions from different model types using a meta-learner. <strong>Gradient Boosting</strong> (GBDT) builds trees sequentially, where each new tree corrects the errors of previous ones — the industry standard for tabular data.', htmlRu: 'Хендбук Яндекса по ML выделяет несколько ансамблевых техник на основе деревьев: <strong>бэггинг</strong> обучает модели независимо на случайных подвыборках и усредняет предсказания. <strong>Стекинг</strong> объединяет предсказания разных типов моделей с помощью мета-обучателя. <strong>Градиентный бустинг</strong> (GBDT) строит деревья последовательно, где каждое новое дерево исправляет ошибки предыдущих — стандарт индустрии для табличных данных.' },
          { type: 'info', variant: 'emerald', text: 'Gradient Boosted Decision Trees (GBDT) is the most powerful non-neural network family. Unlike bagging\'s independent training, boosting builds the ensemble sequentially — each algorithm aims to fix the mistakes of the previous ones. GBDT wins most modern ML competitions on heterogeneous tabular data.', textRu: 'Градиентный бустинг решающих деревьев (GBDT) — самое мощное семейство не-нейросетевых моделей. В отличие от независимого обучения в бэггинге, бустинг реализует идею последовательного построения ансамбля, где каждый следующий алгоритм исправляет ошибки предыдущих. GBDT выигрывает большинство современных соревнований по ML на неоднородных табличных данных.' },
        ],
      },
    ],
    conclusion: 'Decision trees are intuitive, interpretable, and form the foundation for powerful ensemble methods like Random Forest and Gradient Boosting.',
    conclusionRu: 'Решающие деревья интуитивно понятны, интерпретируемы и образуют основу мощных ансамблевых методов — случайного леса и градиентного бустинга.',
    references: [
      { title: 'Classification and Regression Trees', authors: 'Breiman, Friedman, Olshen, Stone', url: 'https://doi.org/10.1201/9781315139470' },
      { title: 'Введение в ML — Классическое обучение с учителем (Хендбук Яндекса)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/vvedenie-glava-dva' },
    ],
  },

  /* ---- 12. Bias Variance Tradeoff ---- */
  {
    slug: 'bias-variance',
    title: 'The Bias-Variance Tradeoff',
    titleRu: 'Компромисс смещения и дисперсии',
    subtitle: 'Balancing Underfitting and Overfitting',
    subtitleRu: 'Баланс между недообучением и переобучением',
    authors: 'Jared Wilber',
    date: 'December 2023',
    thumbnail: `${BASE}/thumbnail-bias-variance.jpg`,
    sections: [
      {
        heading: 'Decomposing Error',
        headingRu: 'Декомпозиция ошибки',
        blocks: [
          { type: 'text', html: 'The total prediction error can be decomposed into <strong>bias</strong> (error from wrong assumptions), <strong>variance</strong> (sensitivity to training data), and <strong>irreducible noise</strong>.', htmlRu: 'Полная ошибка предсказания может быть разложена на <strong>смещение</strong> (ошибка из-за неверных допущений), <strong>дисперсию</strong> (чувствительность к обучающим данным) и <strong>неустранимый шум</strong>.' },
          { type: 'formula', math: 'E[(y - \\hat{f}(x))^2] = \\text{Bias}[\\hat{f}(x)]^2 + \\text{Var}[\\hat{f}(x)] + \\sigma^2', label: 'Bias-variance decomposition', labelRu: 'Декомпозиция смещения и дисперсии' },
          { type: 'chart', chart: 'area', title: 'Bias vs. Variance vs. Total Error', titleRu: 'Смещение vs. дисперсия vs. полная ошибка', description: 'The U-shaped total error curve as model complexity increases', descriptionRu: 'U-образная кривая полной ошибки при росте сложности модели', interactive: true },
        ],
      },
      {
        heading: 'Interactive: LOESS and KNN',
        headingRu: 'Интерактив: LOESS и KNN',
        blocks: [
          { type: 'text', html: 'Adjust the smoothing parameter to see how bias and variance change. Low smoothing = low bias, high variance (overfitting). High smoothing = high bias, low variance (underfitting).', htmlRu: 'Настройте параметр сглаживания, чтобы увидеть, как меняются смещение и дисперсия. Малое сглаживание = низкое смещение, высокая дисперсия (переобучение). Большое сглаживание = высокое смещение, низкая дисперсия (недообучение).' },
          { type: 'chart', chart: 'scatter', title: 'LOESS Smoothing Parameter', titleRu: 'Параметр сглаживания LOESS', description: 'Adjust to see the bias-variance effect in real-time', descriptionRu: 'Настройте для наблюдения эффекта смещения-дисперсии в реальном времени', interactive: true },
          { type: 'text', html: '<strong>Learning curves</strong> (training error vs. validation error as a function of training set size) are the most practical diagnostic tool. If both converge to a high value, the model has high bias. If they diverge widely, the model has high variance.', htmlRu: '<strong>Кривые обучения</strong> (ошибка на обучении vs. валидации как функция размера обучающей выборки) — самый практичный инструмент диагностики. Если обе сходятся к высокому значению — высокое смещение. Если сильно расходятся — высокая дисперсия.' },
          { type: 'info', variant: 'accent', text: 'Practical rule: high bias → add features or use a more complex model. High variance → add data, add regularization, or simplify the model.', textRu: 'Практическое правило: высокое смещение → добавьте признаки или более сложную модель. Высокая дисперсия → добавьте данные, регуляризацию или упростите модель.' },
        ],
      },
    ],
    conclusion: 'The bias-variance tradeoff is a fundamental concept in ML. Finding the sweet spot between underfitting and overfitting is the central challenge of model selection.',
    conclusionRu: 'Компромисс смещения и дисперсии — фундаментальная концепция МО. Поиск баланса между недообучением и переобучением — главная задача выбора модели.',
    references: [
      { title: 'Elements of Statistical Learning', authors: 'Hastie, Tibshirani, Friedman', url: 'https://hastie.su.domains/ElemStatLearn/' },
    ],
  },

  /* ---- 13. Double Descent: Visual ---- */
  {
    slug: 'double-descent',
    title: 'Double Descent: A Visual Introduction',
    titleRu: 'Двойной спуск: визуальное введение',
    subtitle: 'The Surprising Behavior of Modern ML Models',
    subtitleRu: 'Неожиданное поведение современных ML-моделей',
    authors: 'Jared Wilber',
    date: 'January 2024',
    thumbnail: `${BASE}/thumbnail-double-descent.jpg`,
    sections: [
      {
        heading: 'The Double Descent Phenomenon',
        headingRu: 'Феномен двойного спуска',
        blocks: [
          { type: 'text', html: 'In classical ML, test error follows a U-shape as model complexity increases. But in modern deep learning, test error can <strong>decrease again</strong> past the interpolation threshold — this is <strong>double descent</strong>.', htmlRu: 'В классическом МО тестовая ошибка следует U-образной кривой при росте сложности модели. Но в современном глубоком обучении тестовая ошибка может <strong>снова уменьшиться</strong> за порогом интерполяции — это <strong>двойной спуск</strong>.' },
          { type: 'chart', chart: 'line', title: 'Prediction Error vs. Model Complexity', titleRu: 'Ошибка предсказания vs. сложность модели', description: 'The classic U-shape followed by a second descent', descriptionRu: 'Классическая U-образная кривая с последующим вторым спуском', interactive: true },
          { type: 'text', html: 'The interpolation regime — where the model perfectly fits the training data — is where test error peaks before descending again.', htmlRu: 'Режим интерполяции — где модель идеально подгоняет обучающие данные — это где тестовая ошибка достигает пика перед повторным спуском.' },
          { type: 'info', variant: 'accent', text: 'This phenomenon challenges the classical bias-variance tradeoff and suggests that overparameterized models can generalize well.', textRu: 'Этот феномен бросает вызов классическому компромиссу смещения-дисперсии и предполагает, что сверхпараметризованные модели могут хорошо обобщать.' },
          { type: 'text', html: 'In the <strong>classical regime</strong> (parameters < data points), there are not enough parameters to fit the noise. In the <strong>interpolation regime</strong> (parameters = data points), the model barely fits. Beyond this threshold, the model has <strong>excess capacity</strong> and gradient descent selects the simplest interpolating solution.', htmlRu: 'В <strong>классическом режиме</strong> (параметров < точек данных) параметров недостаточно для подгонки шума. В <strong>режиме интерполяции</strong> (параметров = точек данных) модель едва подгоняет. За этим порогом модель имеет <strong>избыточную ёмкость</strong>, и градиентный спуск выбирает простейшее интерполирующее решение.' },
        ],
      },
    ],
    conclusion: 'Double descent reveals that our classical understanding of generalization is incomplete. Modern overparameterized models can achieve remarkable generalization despite perfectly fitting training data.',
    conclusionRu: 'Двойной спуск показывает, что классическое понимание обобщения неполно. Современные сверхпараметризованные модели могут достигать замечательного обобщения, даже идеально подгоняя обучающие данные.',
    references: [
      { title: 'Deep Double Descent', authors: 'Nakkiran et al., 2019', url: 'https://arxiv.org/abs/1912.02292' },
    ],
  },

  /* ---- 14. Double Descent: Math ---- */
  {
    slug: 'double-descent-2',
    title: 'Double Descent: A Mathematical Explanation',
    titleRu: 'Двойной спуск: математическое объяснение',
    subtitle: 'Understanding the Mathematics Behind the Phenomenon',
    subtitleRu: 'Понимание математики за феноменом',
    authors: 'Jared Wilber',
    date: 'February 2024',
    thumbnail: `${BASE}/thumbnail-double-descent2.jpg`,
    sections: [
      {
        heading: 'The Cubic Spline Model',
        headingRu: 'Модель кубических сплайнов',
        blocks: [
          { type: 'text', html: 'Using <strong>cubic splines</strong> as a tractable model, we can derive the double descent curve analytically. The key insight is how the model\'s effective complexity changes near the interpolation threshold.', htmlRu: 'Используя <strong>кубические сплайны</strong> как трактативную модель, можно вывести кривую двойного спуска аналитически. Ключевой инсайт — как эффективная сложность модели меняется вблизи порога интерполяции.' },
          { type: 'formula', math: '\\hat{f}(x) = \\sum_{j=1}^{K} \\beta_j B_j(x)', label: 'Basis function expansion', labelRu: 'Разложение по базисным функциям' },
          { type: 'chart', chart: 'scatter', title: 'Cubic Spline Fitting at Varying Complexity', titleRu: 'Аппроксимация кубическими сплайнами при разной сложности', description: 'Watch the fit change as the number of basis functions increases', descriptionRu: 'Наблюдайте, как меняется подгонка при росте числа базисных функций', interactive: true },
        ],
      },
      {
        heading: 'The Role of Implicit Regularization',
        headingRu: 'Роль неявной регуляризации',
        blocks: [
          { type: 'text', html: 'In overparameterized settings, gradient descent acts as an <strong>implicit regularizer</strong>, selecting the minimum-norm solution among all interpolating functions.', htmlRu: 'В сверхпараметризованных настройках градиентный спуск действует как <strong>неявный регуляризатор</strong>, выбирая решение с минимальной нормой среди всех интерполирующих функций.' },
          { type: 'formula', math: '\\hat{\\beta} = X^T(XX^T)^{-1}y', label: 'Minimum-norm solution (p > n)', labelRu: 'Решение с минимальной нормой (p > n)' },
          { type: 'chart', chart: 'line', title: 'Risk Curve with Analytical Decomposition', titleRu: 'Кривая риска с аналитической декомпозицией', description: 'Bias, variance, and total risk across model complexity', descriptionRu: 'Смещение, дисперсия и полный риск по сложности модели', interactive: true },
        ],
      },
    ],
    conclusion: 'The mathematical analysis of double descent reveals how implicit regularization in overparameterized models leads to good generalization — a key insight for modern deep learning theory.',
    conclusionRu: 'Математический анализ двойного спуска раскрывает, как неявная регуляризация в сверхпараметризованных моделях приводит к хорошему обобщению — ключевой инсайт теории глубокого обучения.',
    references: [
      { title: 'Benign Overfitting in Linear Regression', authors: 'Bartlett et al., 2020', url: 'https://arxiv.org/abs/1906.11300' },
    ],
  },

  /* ---- 15. Convolutional Neural Networks ---- */
  {
    slug: 'cnn',
    title: 'Convolutional Neural Networks',
    titleRu: 'Свёрточные нейронные сети',
    subtitle: 'How Machines Learn to See — From Pixels to Patterns',
    subtitleRu: 'Как машины учатся видеть — от пикселей к паттернам',
    authors: 'Jared Wilber',
    date: 'March 2024',
    thumbnail: '/thumbnails/thumbnail-cnn.svg',
    sections: [
      {
        heading: 'The Convolution Operation',
        headingRu: 'Операция свёртки',
        blocks: [
          { type: 'text', html: 'A <strong>convolution</strong> slides a small filter (kernel) across an input image, computing a dot product at each position. This produces a <strong>feature map</strong> that highlights specific patterns — edges, textures, or shapes.', htmlRu: '<strong>Свёртка</strong> скользит малым фильтром (ядром) по входному изображению, вычисляя скалярное произведение в каждой позиции. Это создаёт <strong>карту признаков</strong>, выделяющую конкретные паттерны — границы, текстуры или формы.' },
          { type: 'formula', math: '(f * g)(t) = \\sum_{\\tau} f(\\tau) \\cdot g(t - \\tau)', label: 'Discrete convolution', labelRu: 'Дискретная свёртка' },
          { type: 'chart', chart: 'heatmap', title: 'Feature Map After Convolution', titleRu: 'Карта признаков после свёртки', description: 'Watch how a 3×3 edge-detection filter transforms the input', descriptionRu: 'Наблюдайте, как фильтр детекции границ 3×3 преобразует вход', interactive: true },
          { type: 'definition', title: 'Output Size', titleRu: 'Размер выхода', math: 'O = \\left\\lfloor \\frac{W - K + 2P}{S} \\right\\rfloor + 1', note: 'W = input size, K = kernel size, P = padding, S = stride', noteRu: 'W = размер входа, K = размер ядра, P = отступ, S = шаг' },
        ],
      },
      {
        heading: 'Pooling & Hierarchical Features',
        headingRu: 'Пулинг и иерархические признаки',
        blocks: [
          { type: 'text', html: '<strong>Max pooling</strong> downsamples feature maps by taking the maximum value in each window. This provides translation invariance and reduces computation.', htmlRu: '<strong>Макс-пулинг</strong> уменьшает карты признаков, беря максимальное значение в каждом окне. Это обеспечивает инвариантность к сдвигу и уменьшает вычисления.' },
          { type: 'formula', math: 'y_{i,j} = \\max_{(p,q) \\in R_{i,j}} x_{p,q}', label: 'Max pooling', labelRu: 'Макс-пулинг' },
          { type: 'chart', chart: 'architecture', title: 'CNN Architecture: LeNet-5', titleRu: 'Архитектура CNN: LeNet-5', description: 'Classic CNN: Conv → Pool → Conv → Pool → FC → Output', descriptionRu: 'Классическая CNN: свёртка → пулинг → свёртка → пулинг → полносвязный → выход', interactive: true },
          { type: 'info', variant: 'accent', text: 'Modern architectures like ResNet use skip connections to train networks with 100+ layers, solving the vanishing gradient problem in deep CNNs.', textRu: 'Современные архитектуры вроде ResNet используют skip-соединения для обучения сетей с 100+ слоями, решая проблему затухающих градиентов в глубоких CNN.' },
        ],
      },
      {
        heading: 'Training a CNN',
        headingRu: 'Обучение свёрточной сети',
        blocks: [
          { type: 'text', html: 'CNNs learn filters automatically through <strong>backpropagation</strong>. Early layers detect edges, middle layers detect shapes, and deep layers detect complex objects.', htmlRu: 'CNN обучают фильтры автоматически через <strong>обратное распространение</strong>. Ранние слои детектируют границы, средние — формы, глубокие — сложные объекты.' },
          { type: 'chart', chart: 'area', title: 'Training & Validation Loss', titleRu: 'Потеря на обучении и валидации', description: 'How a CNN learns to classify images over epochs', descriptionRu: 'Как CNN обучается классифицировать изображения по эпохам', interactive: true },
          { type: 'formula', math: '\\frac{\\partial L}{\\partial W_{ij}} = \\sum_m \\sum_n \\frac{\\partial L}{\\partial O_{mn}} \\cdot \\frac{\\partial O_{mn}}{\\partial W_{ij}}', label: 'Gradient w.r.t. weights', labelRu: 'Градиент по весам' },
          { type: 'info', variant: 'emerald', text: 'Data augmentation (rotation, flip, crop, color jitter) is essential for CNNs. It artificially expands the training set and teaches the network invariance to transformations.', textRu: 'Аугментация данных (поворот, отражение, обрезка, цветовые изменения) необходима для CNN. Она искусственно расширяет обучающую выборку и обучает сеть инвариантности к преобразованиям.' },
          { type: 'text', html: '<strong>Real-world applications</strong>: medical image analysis (detecting tumors in X-rays), self-driving cars (object detection), satellite imagery analysis, facial recognition, and industrial quality inspection.', htmlRu: '<strong>Реальные применения</strong>: анализ медицинских снимков (обнаружение опухолей на рентгене), беспилотные автомобили (детекция объектов), анализ спутниковых снимков, распознавание лиц и промышленный контроль качества.' },
        ],
      },
    ],
    conclusion: 'CNNs revolutionized computer vision and remain the backbone of image understanding systems — from medical imaging to self-driving cars. Their hierarchical feature learning mirrors how the visual cortex processes information.',
    conclusionRu: 'Свёрточные сети произвели революцию в компьютерном зрении и остаются основой систем распознавания изображений — от медицинской визуализации до беспилотных автомобилей. Их иерархическое обучение признаков повторяет работу зрительной коры.',
    references: [
      { title: 'Gradient-Based Learning Applied to Document Recognition', authors: 'LeCun et al., 1998', url: 'http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf' },
      { title: 'Deep Residual Learning for Image Recognition', authors: 'He et al., 2015', url: 'https://arxiv.org/abs/1512.03385' },
    ],
  },

  /* ---- 16. Recurrent Neural Networks & LSTMs ---- */
  {
    slug: 'rnn-lstm',
    title: 'RNNs & LSTMs',
    titleRu: 'RNN и LSTM',
    subtitle: 'Learning from Sequences — Memory in Neural Networks',
    subtitleRu: 'Обучение на последовательностях — память в нейросетях',
    authors: 'Jared Wilber',
    date: 'April 2024',
    thumbnail: '/thumbnails/thumbnail-rnn.svg',
    sections: [
      {
        heading: 'The Recurrence',
        headingRu: 'Рекуррентность',
        blocks: [
          { type: 'text', html: 'Recurrent Neural Networks process sequences one element at a time, maintaining a <strong>hidden state</strong> that acts as memory. At each timestep, the hidden state is updated using the current input and the previous state.', htmlRu: 'Рекуррентные нейронные сети обрабатывают последовательности по одному элементу, поддерживая <strong>скрытое состояние</strong>, выполняющее роль памяти. На каждом шаге скрытое состояние обновляется с использованием текущего входа и предыдущего состояния.' },
          { type: 'formula', math: 'h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)', label: 'RNN hidden state update', labelRu: 'Обновление скрытого состояния RNN' },
          { type: 'chart', chart: 'architecture', title: 'Unrolled RNN Over Time', titleRu: 'Развёрнутая RNN по времени', description: 'The recurrent connections unrolled across timesteps', descriptionRu: 'Рекуррентные соединения, развёрнутые по временным шагам', interactive: true },
          { type: 'text', html: 'While elegant, vanilla RNNs suffer from the <strong>vanishing gradient problem</strong> — gradients shrink exponentially as they propagate back through time, making long-range dependencies impossible to learn.', htmlRu: 'При всей элегантности обычные RNN страдают от проблемы <strong>затухающих градиентов</strong> — градиенты экспоненциально уменьшаются при распространении назад по времени, делая невозможным обучение долгосрочным зависимостям.' },
        ],
      },
      {
        heading: 'Long Short-Term Memory (LSTM)',
        headingRu: 'Долгая краткосрочная память (LSTM)',
        blocks: [
          { type: 'text', html: 'LSTMs solve the vanishing gradient problem using a <strong>cell state</strong> and three <strong>gates</strong> that control the flow of information.', htmlRu: 'LSTM решают проблему затухающих градиентов, используя <strong>состояние ячейки</strong> и три <strong>вентиля</strong>, контролирующих поток информации.' },
          { type: 'formula', math: 'f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)', label: 'Forget gate', labelRu: 'Вентиль забывания' },
          { type: 'formula', math: 'i_t = \\sigma(W_i \\cdot [h_{t-1}, x_t] + b_i), \\quad \\tilde{C}_t = \\tanh(W_C \\cdot [h_{t-1}, x_t] + b_C)', label: 'Input gate & candidate', labelRu: 'Входной вентиль и кандидат' },
          { type: 'formula', math: 'C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t', label: 'Cell state update', labelRu: 'Обновление состояния ячейки' },
          { type: 'formula', math: 'o_t = \\sigma(W_o \\cdot [h_{t-1}, x_t] + b_o), \\quad h_t = o_t \\odot \\tanh(C_t)', label: 'Output gate & hidden state', labelRu: 'Выходной вентиль и скрытое состояние' },
          { type: 'info', variant: 'emerald', text: 'The forget gate is the key innovation — it lets the LSTM selectively remember or discard information, enabling learning over hundreds of timesteps.', textRu: 'Вентиль забывания — ключевая инновация: он позволяет LSTM селективно запоминать или отбрасывать информацию, обеспечивая обучение на сотнях временных шагов.' },
        ],
      },
      {
        heading: 'Sequence Modeling in Practice',
        headingRu: 'Моделирование последовательностей на практике',
        blocks: [
          { type: 'chart', chart: 'line', title: 'Perplexity vs. Training Epochs', titleRu: 'Перплексия vs. эпохи обучения', description: 'How LSTM language models improve over time', descriptionRu: 'Как языковые модели LSTM улучшаются со временем', interactive: true },
          { type: 'chart', chart: 'area', title: 'Gradient Norm Over Timesteps', titleRu: 'Норма градиента по временным шагам', description: 'Comparing gradient flow: vanilla RNN vs. LSTM', descriptionRu: 'Сравнение потока градиентов: обычная RNN vs. LSTM', interactive: true },
          { type: 'text', html: '<strong>GRU (Gated Recurrent Unit)</strong> simplifies LSTM to two gates (reset and update), reducing parameters while maintaining similar performance. In practice, GRU and LSTM perform comparably on most tasks.', htmlRu: '<strong>GRU (Gated Recurrent Unit)</strong> упрощает LSTM до двух вентилей (сброс и обновление), уменьшая параметры при сохранении схожего качества. На практике GRU и LSTM показывают сопоставимые результаты на большинстве задач.' },
          { type: 'info', variant: 'accent', text: 'Applications of RNNs/LSTMs: machine translation (before Transformers), speech recognition, time-series forecasting, music generation, and handwriting recognition.', textRu: 'Применения RNN/LSTM: машинный перевод (до трансформеров), распознавание речи, прогнозирование временных рядов, генерация музыки и распознавание рукописного текста.' },
        ],
      },
    ],
    conclusion: 'LSTMs and their variants (GRUs, bidirectional LSTMs) were the dominant architecture for sequence modeling for over a decade. While Transformers have largely superseded them, understanding recurrence is fundamental to understanding sequential reasoning in modern models.',
    conclusionRu: 'LSTM и их варианты (GRU, двунаправленные LSTM) были доминирующей архитектурой для моделирования последовательностей более десяти лет. Хотя трансформеры в основном вытеснили их, понимание рекуррентности необходимо для понимания последовательного рассуждения в современных моделях.',
    references: [
      { title: 'Long Short-Term Memory', authors: 'Hochreiter & Schmidhuber, 1997', url: 'https://www.bioinf.jku.at/publications/older/2604.pdf' },
      { title: 'Understanding LSTM Networks', authors: 'Christopher Olah, 2015', url: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/' },
    ],
  },

  /* ---- 17. Generative Adversarial Networks ---- */
  {
    slug: 'gan',
    title: 'Generative Adversarial Networks',
    titleRu: 'Генеративно-состязательные сети',
    subtitle: 'Two Networks, One Game — Learning to Generate from Noise',
    subtitleRu: 'Две сети, одна игра — обучение генерации из шума',
    authors: 'Jared Wilber',
    date: 'May 2024',
    thumbnail: '/thumbnails/thumbnail-gan.svg',
    sections: [
      {
        heading: 'The Minimax Game',
        headingRu: 'Минимаксная игра',
        blocks: [
          { type: 'text', html: 'A GAN consists of two networks: a <strong>Generator</strong> G that creates fake data from noise, and a <strong>Discriminator</strong> D that tries to distinguish real from fake. They play a minimax game.', htmlRu: 'GAN состоит из двух сетей: <strong>генератора</strong> G, создающего фейковые данные из шума, и <strong>дискриминатора</strong> D, пытающегося отличить реальные от фейковых. Они играют минимаксную игру.' },
          { type: 'formula', math: '\\min_G \\max_D \\; V(D,G) = \\mathbb{E}_{x \\sim p_{data}}[\\log D(x)] + \\mathbb{E}_{z \\sim p_z}[\\log(1 - D(G(z)))]', label: 'GAN objective', labelRu: 'Целевая функция GAN' },
          { type: 'chart', chart: 'architecture', title: 'GAN Architecture', titleRu: 'Архитектура GAN', description: 'Generator creates fakes, Discriminator judges them', descriptionRu: 'Генератор создаёт фейки, дискриминатор их оценивает', interactive: true },
          { type: 'text', html: 'At the Nash equilibrium, the generator produces samples indistinguishable from real data, and the discriminator outputs 0.5 for all inputs.', htmlRu: 'В равновесии Нэша генератор создаёт образцы, неотличимые от реальных данных, а дискриминатор выдаёт 0.5 для всех входов.' },
        ],
      },
      {
        heading: 'Training Dynamics',
        headingRu: 'Динамика обучения',
        blocks: [
          { type: 'chart', chart: 'line', title: 'Generator vs. Discriminator Loss', titleRu: 'Потеря генератора vs. дискриминатора', description: 'The adversarial training dynamics over epochs', descriptionRu: 'Динамика состязательного обучения по эпохам', interactive: true },
          { type: 'formula', math: 'D_{KL}(p_{data} \\| p_g) = \\sum_x p_{data}(x) \\log \\frac{p_{data}(x)}{p_g(x)}', label: 'KL Divergence (mode collapse measure)', labelRu: 'KL-дивергенция (мера коллапса мод)' },
          { type: 'info', variant: 'amber', text: 'Mode collapse: when the generator learns to produce only a narrow set of outputs, ignoring the diversity of the real distribution. WGAN and spectral normalization help mitigate this.', textRu: 'Коллапс мод: когда генератор обучается выдавать только узкий набор выходов, игнорируя разнообразие реального распределения. WGAN и спектральная нормализация помогают это смягчить.' },
          { type: 'chart', chart: 'scatter', title: 'Generated Samples in Latent Space', titleRu: 'Сгенерированные образцы в латентном пространстве', description: 'How noise vectors map to generated outputs', descriptionRu: 'Как векторы шума отображаются в сгенерированные выходы', interactive: true },
          { type: 'text', html: '<strong>WGAN</strong> replaces the binary discriminator with a critic that estimates the Wasserstein distance, providing more stable training and better convergence signals.', htmlRu: '<strong>WGAN</strong> заменяет бинарный дискриминатор критиком, оценивающим расстояние Вассерштейна, обеспечивая более стабильное обучение и лучшие сигналы сходимости.' },
          { type: 'info', variant: 'emerald', text: 'Modern generative AI has largely moved from GANs to <strong>diffusion models</strong> (Stable Diffusion, DALL-E). Diffusion models train to denoise data iteratively, avoiding mode collapse entirely.', textRu: 'Современный генеративный ИИ в основном перешёл от GAN к <strong>диффузионным моделям</strong> (Stable Diffusion, DALL-E). Диффузионные модели обучаются итеративному удалению шума, полностью избегая коллапса мод.' },
        ],
      },
    ],
    conclusion: 'GANs sparked a revolution in generative AI — from StyleGAN faces to CycleGAN style transfer. Though diffusion models have overtaken them for image generation, the adversarial training paradigm remains influential in RLHF and AI safety.',
    conclusionRu: 'GAN запустили революцию в генеративном ИИ — от лиц StyleGAN до переноса стиля CycleGAN. Хотя диффузионные модели обогнали их в генерации изображений, парадигма состязательного обучения остаётся влиятельной в RLHF и безопасности ИИ.',
    references: [
      { title: 'Generative Adversarial Nets', authors: 'Goodfellow et al., 2014', url: 'https://arxiv.org/abs/1406.2661' },
      { title: 'A Style-Based Generator Architecture for GANs', authors: 'Karras et al., 2018', url: 'https://arxiv.org/abs/1812.04948' },
    ],
  },

  /* ---- 18. Transformers & Self-Attention ---- */
  {
    slug: 'transformer',
    title: 'Transformers & Self-Attention',
    titleRu: 'Трансформеры и самовнимание',
    subtitle: 'The Architecture Behind GPT, BERT, and Modern AI',
    subtitleRu: 'Архитектура за GPT, BERT и современным ИИ',
    authors: 'Jared Wilber',
    date: 'June 2024',
    thumbnail: '/thumbnails/thumbnail-transformer.svg',
    sections: [
      {
        heading: 'Scaled Dot-Product Attention',
        headingRu: 'Масштабированное внимание (dot-product)',
        blocks: [
          { type: 'text', html: 'The <strong>self-attention mechanism</strong> allows each token to attend to every other token in the sequence. Queries, Keys, and Values are computed via linear projections.', htmlRu: 'Механизм <strong>самовнимания</strong> позволяет каждому токену обращаться к каждому другому токену в последовательности. Запросы, Ключи и Значения вычисляются через линейные проекции.' },
          { type: 'formula', math: '\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V', label: 'Scaled dot-product attention', labelRu: 'Масштабированное внимание (dot-product)' },
          { type: 'chart', chart: 'heatmap', title: 'Self-Attention Weights', titleRu: 'Веса самовнимания', description: 'Which tokens attend to which — the attention pattern', descriptionRu: 'Какие токены к каким обращаются — паттерн внимания', interactive: true },
          { type: 'definition', title: 'Multi-Head Attention', titleRu: 'Мультиголовочное внимание', math: '\\text{MultiHead}(Q,K,V) = \\text{Concat}(head_1, \\ldots, head_h) W^O', note: 'Each head learns different attention patterns — syntax, semantics, position.', noteRu: 'Каждая голова обучает разные паттерны внимания — синтаксис, семантику, позицию.' },
        ],
      },
      {
        heading: 'The Full Transformer Block',
        headingRu: 'Полный блок трансформера',
        blocks: [
          { type: 'text', html: 'A Transformer block consists of <strong>multi-head self-attention</strong> followed by a <strong>feed-forward network</strong>, with <strong>layer normalization</strong> and <strong>residual connections</strong>.', htmlRu: 'Блок трансформера состоит из <strong>мультиголовочного самовнимания</strong>, за которым следует <strong>полносвязная сеть</strong>, с <strong>нормализацией слоёв</strong> и <strong>остаточными соединениями</strong>.' },
          { type: 'formula', math: '\\text{FFN}(x) = \\max(0, xW_1 + b_1)W_2 + b_2', label: 'Feed-forward network (GeLU in practice)', labelRu: 'Полносвязная сеть (на практике GeLU)' },
          { type: 'formula', math: '\\text{LayerNorm}(x) = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} \\cdot \\gamma + \\beta', label: 'Layer normalization', labelRu: 'Нормализация слоёв' },
          { type: 'chart', chart: 'architecture', title: 'Transformer Encoder-Decoder Architecture', titleRu: 'Архитектура энкодер-декодер трансформера', description: 'The full "Attention Is All You Need" architecture', descriptionRu: 'Полная архитектура «Attention Is All You Need»', interactive: true },
        ],
      },
      {
        heading: 'Positional Encoding & Scaling',
        headingRu: 'Позиционное кодирование и масштабирование',
        blocks: [
          { type: 'text', html: 'Unlike RNNs, Transformers have no inherent notion of order. <strong>Positional encodings</strong> inject sequence position information into the embeddings.', htmlRu: 'В отличие от RNN, трансформеры не имеют встроенного понятия порядка. <strong>Позиционные кодирования</strong> вводят информацию о позиции последовательности в эмбеддинги.' },
          { type: 'formula', math: 'PE_{(pos, 2i)} = \\sin\\!\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right), \\quad PE_{(pos, 2i+1)} = \\cos\\!\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)', label: 'Sinusoidal positional encoding', labelRu: 'Синусоидальное позиционное кодирование' },
          { type: 'chart', chart: 'line', title: 'Model Performance vs. Scale', titleRu: 'Качество модели vs. масштаб', description: 'How Transformer performance scales with parameters and data', descriptionRu: 'Как качество трансформера масштабируется с параметрами и данными', interactive: true },
          { type: 'info', variant: 'accent', text: 'Scaling laws: performance improves predictably as a power law of model size, dataset size, and compute budget — the foundation of the "bigger is better" paradigm.', textRu: 'Законы масштабирования: качество предсказуемо улучшается как степенная функция размера модели, объёма данных и вычислительного бюджета — основа парадигмы «больше = лучше».' },
          { type: 'text', html: '<strong>Modern Transformer variants</strong>: GPT (decoder-only, autoregressive), BERT (encoder-only, masked LM), T5 (encoder-decoder, text-to-text). Most current LLMs use the decoder-only architecture.', htmlRu: '<strong>Современные варианты трансформеров</strong>: GPT (только декодер, авторегрессионный), BERT (только энкодер, маскированный LM), T5 (энкодер-декодер, текст-в-текст). Большинство современных LLM используют архитектуру только с декодером.' },
          { type: 'definition', title: 'KV Cache (Inference)', titleRu: 'KV-кэш (инференс)', math: 'O(N^2d) \\to O(Nd) \\text{ per token}', note: 'Pre-computing Key-Value pairs for past tokens avoids redundant computation during autoregressive generation.', noteRu: 'Предвычисление пар Ключ-Значение для прошлых токенов avoids избыточные вычисления при авторегрессионной генерации.' },
        ],
      },
    ],
    conclusion: 'The Transformer architecture is the foundation of modern AI — powering GPT-4, Claude, Gemini, and virtually every state-of-the-art model. Its parallelizable self-attention mechanism made training on massive datasets feasible, ushering in the era of large language models.',
    conclusionRu: 'Архитектура трансформера — основа современного ИИ, обеспечивающая GPT-4, Claude, Gemini и практически все передовые модели. Её параллелизуемый механизм самовнимания сделал возможным обучение на огромных наборах данных, открыв эру больших языковых моделей.',
    references: [
      { title: 'Attention Is All You Need', authors: 'Vaswani et al., 2017', url: 'https://arxiv.org/abs/1706.03762' },
      { title: 'Scaling Laws for Neural Language Models', authors: 'Kaplan et al., 2020', url: 'https://arxiv.org/abs/2001.08361' },
    ],
  },

  /* ---- 19. Autoencoders & VAEs ---- */
  {
    slug: 'autoencoder',
    title: 'Autoencoders & VAEs',
    titleRu: 'Автоэнкодеры и VAE',
    subtitle: 'Learning Compressed Representations of Data',
    subtitleRu: 'Обучение сжатых представлений данных',
    authors: 'Jared Wilber',
    date: 'July 2024',
    thumbnail: '/thumbnails/thumbnail-autoencoder.svg',
    sections: [
      {
        heading: 'The Encoder-Decoder Framework',
        headingRu: 'Архитектура энкодер-декодер',
        blocks: [
          { type: 'text', html: 'An <strong>autoencoder</strong> learns to compress input data into a low-dimensional <strong>latent representation</strong>, then reconstruct it. The bottleneck forces the network to learn efficient encodings.', htmlRu: '<strong>Автоэнкодер</strong> обучается сжимать входные данные в низкоразмерное <strong>латентное представление</strong>, а затем восстанавливать их. Узкое место заставляет сеть обучать эффективные кодирования.' },
          { type: 'formula', math: 'z = f_{enc}(x), \\quad \\hat{x} = f_{dec}(z), \\quad L = \\|x - \\hat{x}\\|^2', label: 'Encode → Decode → Reconstruction loss', labelRu: 'Кодирование → Декодирование → Потеря реконструкции' },
          { type: 'chart', chart: 'architecture', title: 'Autoencoder Architecture', titleRu: 'Архитектура автоэнкодера', description: 'Encoder compresses, Decoder reconstructs', descriptionRu: 'Энкодер сжимает, декодер восстанавливает', interactive: true },
        ],
      },
      {
        heading: 'Variational Autoencoders (VAE)',
        headingRu: 'Вариационные автоэнкодеры (VAE)',
        blocks: [
          { type: 'text', html: 'VAEs add a probabilistic twist: the encoder outputs a <strong>distribution</strong> (mean and variance) rather than a fixed vector. The <strong>reparameterization trick</strong> enables backpropagation through sampling.', htmlRu: 'VAE добавляют вероятностный поворот: энкодер выдаёт <strong>распределение</strong> (среднее и дисперсию), а не фиксированный вектор. <strong>Трюк репараметризации</strong> обеспечивает обратное распространение через сэмплирование.' },
          { type: 'formula', math: 'z = \\mu + \\sigma \\odot \\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0, I)', label: 'Reparameterization trick', labelRu: 'Трюк репараметризации' },
          { type: 'formula', math: 'L_{VAE} = \\underbrace{-\\mathbb{E}_{q(z|x)}[\\log p(x|z)]}_{\\text{reconstruction}} + \\underbrace{D_{KL}(q(z|x) \\| p(z))}_{\\text{regularization}}', label: 'ELBO loss', labelRu: 'Потеря ELBO' },
          { type: 'chart', chart: 'scatter', title: 'VAE Latent Space', titleRu: 'Латентное пространство VAE', description: 'How data points cluster in the learned 2D latent space', descriptionRu: 'Как точки данных кластеризуются в обученном 2D латентном пространстве', interactive: true },
          { type: 'info', variant: 'emerald', text: 'The KL divergence term acts as a regularizer, pushing the latent distribution toward a standard normal — enabling smooth interpolation and generation.', textRu: 'KL-дивергенция действует как регуляризатор, подтягивая латентное распределение к стандартному нормальному — обеспечивая плавную интерполяцию и генерацию.' },
          { type: 'text', html: '<strong>VQ-VAE</strong> (Vector Quantized VAE) uses a discrete latent space with a codebook, producing sharper reconstructions. It powers many modern image and audio generation models.', htmlRu: '<strong>VQ-VAE</strong> (векторно-квантованный VAE) использует дискретное латентное пространство с таблицей кодов, давая более чёткие реконструкции. Он лежит в основе многих современных моделей генерации изображений и аудио.' },
        ],
      },
    ],
    conclusion: 'Autoencoders and VAEs are foundational to representation learning. VAEs in particular laid the groundwork for modern generative models, and their latent space interpretation remains a powerful tool for understanding learned representations.',
    conclusionRu: 'Автоэнкодеры и VAE — основа обучения представлений. VAE, в частности, заложили фундамент современных генеративных моделей, а интерпретация их латентного пространства остаётся мощным инструментом анализа представлений.',
    references: [
      { title: 'Auto-Encoding Variational Bayes', authors: 'Kingma & Welling, 2013', url: 'https://arxiv.org/abs/1312.6114' },
    ],
  },

  /* ---- 20. Attention Mechanism Deep Dive ---- */
  {
    slug: 'attention',
    title: 'Attention Mechanisms',
    titleRu: 'Механизмы внимания',
    subtitle: 'From Bahdanau to Multi-Head — How Models Focus',
    subtitleRu: 'От Бахданау до мультиголовочного внимания — как модели фокусируются',
    authors: 'Jared Wilber',
    date: 'August 2024',
    thumbnail: '/thumbnails/thumbnail-attention.svg',
    sections: [
      {
        heading: 'Additive (Bahdanau) Attention',
        headingRu: 'Аддитивное внимание (Бахданау)',
        blocks: [
          { type: 'text', html: 'The original attention mechanism computes alignment scores between a decoder state and each encoder hidden state, producing a <strong>context vector</strong> as a weighted sum.', htmlRu: 'Оригинальный механизм внимания вычисляет оценки выравнивания между состоянием декодера и каждым скрытым состоянием энкодера, создавая <strong>контекстный вектор</strong> как взвешенную сумму.' },
          { type: 'formula', math: 'e_{ij} = a(s_{i-1}, h_j), \\quad \\alpha_{ij} = \\frac{\\exp(e_{ij})}{\\sum_k \\exp(e_{ik})}, \\quad c_i = \\sum_j \\alpha_{ij} h_j', label: 'Bahdanau attention', labelRu: 'Внимание Бахданау' },
          { type: 'chart', chart: 'heatmap', title: 'Attention Alignment Matrix', titleRu: 'Матрица выравнивания внимания', description: 'How decoder tokens attend to encoder tokens in translation', descriptionRu: 'Как токены декодера обращаются к токенам энкодера при переводе', interactive: true },
        ],
      },
      {
        heading: 'Attention Variants',
        headingRu: 'Варианты внимания',
        blocks: [
          { type: 'text', html: '<strong>Luong attention</strong> simplifies the score function to a dot product. <strong>Cross-attention</strong> lets one sequence attend to another. <strong>Causal (masked) attention</strong> prevents attending to future tokens — essential for autoregressive generation.', htmlRu: '<strong>Внимание Луонга</strong> упрощает функцию оценки до скалярного произведения. <strong>Перекрёстное внимание</strong> позволяет одной последовательности обращаться к другой. <strong>Каузальное (маскированное) внимание</strong> предотвращает обращение к будущим токенам — необходимо для авторегрессионной генерации.' },
          { type: 'formula', math: '\\text{score}(Q, K) = \\begin{cases} QK^T / \\sqrt{d_k} & \\text{dot-product} \\\\ v^T \\tanh(W_1 Q + W_2 K) & \\text{additive} \\end{cases}', label: 'Attention score functions', labelRu: 'Функции оценки внимания' },
          { type: 'chart', chart: 'line', title: 'Attention Entropy Over Layers', titleRu: 'Энтропия внимания по слоям', description: 'How attention becomes more focused in deeper layers', descriptionRu: 'Как внимание становится более фокусированным в глубоких слоях', interactive: true },
          { type: 'info', variant: 'accent', text: 'Flash Attention: an algorithm that computes exact attention with IO-awareness, reducing memory from O(N²) to O(N) — enabling 100K+ context windows.', textRu: 'Flash Attention: алгоритм вычисления точного внимания с учётом IO, уменьшающий память с O(N²) до O(N) — обеспечивает контекстные окна 100K+.' },
          { type: 'text', html: '<strong>Grouped Query Attention (GQA)</strong> and <strong>Multi-Query Attention (MQA)</strong> reduce KV cache memory by sharing fewer key/value heads across query heads — essential for efficient LLM inference.', htmlRu: '<strong>Grouped Query Attention (GQA)</strong> и <strong>Multi-Query Attention (MQA)</strong> уменьшают память KV-кэша, разделяя меньше голов ключей/значений между головами запросов — необходимо для эффективного инференса LLM.' },
          { type: 'definition', title: 'Sparse Attention', titleRu: 'Разреженное внимание', math: '\\text{Attention}(Q,K,V) = \\text{softmax}\\!\\left(\\frac{QK^T_{\\text{top-k}}}{\\sqrt{d_k}}\\right) V', note: 'Only attend to the top-k most relevant keys. Reduces O(N²) to O(Nk), enabling longer sequences.', noteRu: 'Обращение только к top-k наиболее релевантным ключам. Уменьшает O(N²) до O(Nk), обеспечивая более длинные последовательности.' },
        ],
      },
    ],
    conclusion: 'Attention is the key innovation that made Transformers possible. Understanding the evolution from additive to multi-head attention reveals how modern models process and reason about sequential information.',
    conclusionRu: 'Внимание — ключевая инновация, сделавшая трансформеры возможными. Понимание эволюции от аддитивного до мультиголовочного внимания раскрывает, как современные модели обрабатывают последовательную информацию.',
    references: [
      { title: 'Neural Machine Translation by Jointly Learning to Align and Translate', authors: 'Bahdanau et al., 2014', url: 'https://arxiv.org/abs/1409.0473' },
      { title: 'FlashAttention: Fast and Memory-Efficient Attention', authors: 'Dao et al., 2022', url: 'https://arxiv.org/abs/2205.14135' },
    ],
  },

  /* ---- 21. Batch Normalization ---- */
  {
    slug: 'batch-norm',
    title: 'Batch Normalization',
    titleRu: 'Пакетная нормализация',
    subtitle: 'Stabilizing and Accelerating Deep Network Training',
    subtitleRu: 'Стабилизация и ускорение обучения глубоких сетей',
    authors: 'Jared Wilber',
    date: 'September 2024',
    thumbnail: '/thumbnails/thumbnail-batchnorm.svg',
    sections: [
      {
        heading: 'Internal Covariate Shift',
        headingRu: 'Внутренний ковариативный сдвиг',
        blocks: [
          { type: 'text', html: 'As a deep network trains, the distribution of inputs to each layer changes — this <strong>internal covariate shift</strong> slows training. Batch Normalization fixes this by normalizing layer inputs.', htmlRu: 'По мере обучения глубокой сети распределение входов каждого слоя меняется — этот <strong>внутренний ковариативный сдвиг</strong> замедляет обучение. Пакетная нормализация решает это, нормализуя входы слоёв.' },
          { type: 'formula', math: '\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\quad y_i = \\gamma \\hat{x}_i + \\beta', label: 'Batch normalization', labelRu: 'Пакетная нормализация' },
          { type: 'definition', title: 'Running Statistics (Inference)', titleRu: 'Накопленные статистики (инференс)', math: '\\mu_{running} = \\alpha \\mu_B + (1-\\alpha)\\mu_{running}', note: 'At inference, use running mean/variance instead of batch statistics.', noteRu: 'При инференсе используйте накопленные среднее/дисперсию вместо статистик батча.' },
        ],
      },
      {
        heading: 'Effects on Training',
        headingRu: 'Влияние на обучение',
        blocks: [
          { type: 'chart', chart: 'line', title: 'Training Loss: With vs. Without BatchNorm', titleRu: 'Потеря обучения: с BatchNorm vs. без', description: 'How BatchNorm accelerates convergence', descriptionRu: 'Как BatchNorm ускоряет сходимость', interactive: true },
          { type: 'chart', chart: 'area', title: 'Activation Distribution Across Layers', titleRu: 'Распределение активаций по слоям', description: 'How BatchNorm keeps activations well-distributed', descriptionRu: 'Как BatchNorm поддерживает хорошее распределение активаций', interactive: true },
          { type: 'info', variant: 'emerald', text: 'BatchNorm allows higher learning rates, acts as a mild regularizer, and reduces sensitivity to initialization — making deep network training far more robust.', textRu: 'BatchNorm позволяет использовать более высокие темпы обучения, действует как мягкий регуляризатор и снижает чувствительность к инициализации — делая обучение глубоких сетей значительно более надёжным.' },
          { type: 'text', html: '<strong>Group Normalization</strong> divides channels into groups and normalizes within each group — independent of batch size. Essential for object detection and segmentation tasks where batch sizes are small.', htmlRu: '<strong>Групповая нормализация</strong> делит каналы на группы и нормализует внутри каждой группы — независимо от размера батча. Необходима для задач детекции объектов и сегментации, где батчи малы.' },
          { type: 'text', html: 'In <strong>Transformers</strong>, LayerNorm is applied before each sublayer (Pre-LN) or after (Post-LN). Pre-LN is now standard as it provides more stable gradients in deep Transformers.', htmlRu: 'В <strong>трансформерах</strong> LayerNorm применяется перед каждым подслоём (Pre-LN) или после (Post-LN). Pre-LN теперь стандартен, так как обеспечивает более стабильные градиенты в глубоких трансформерах.' },
          { type: 'formula', math: '\\text{LayerNorm}(x) = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} \\gamma + \\beta \\quad \\text{(per-sample, not per-batch)}', label: 'Layer Normalization (for Transformers)', labelRu: 'Layer Normalization (для трансформеров)' },
        ],
      },
    ],
    conclusion: 'Batch Normalization is one of the most impactful innovations in deep learning. While Layer Norm has become standard for Transformers, BatchNorm remains essential for CNNs and many other architectures.',
    conclusionRu: 'Пакетная нормализация — одна из самых влиятельных инноваций в глубоком обучении. Хотя LayerNorm стал стандартом для трансформеров, BatchNorm остаётся незаменимым для CNN и многих других архитектур.',
    references: [
      { title: 'Batch Normalization: Accelerating Deep Network Training', authors: 'Ioffe & Szegedy, 2015', url: 'https://arxiv.org/abs/1502.03167' },
    ],
  },

  /* ---- 22. Dropout & Regularization ---- */
  {
    slug: 'dropout',
    title: 'Dropout & Regularization',
    titleRu: 'Dropout и регуляризация',
    subtitle: 'Preventing Overfitting in Deep Neural Networks',
    subtitleRu: 'Предотвращение переобучения в глубоких нейросетях',
    authors: 'Jared Wilber',
    date: 'October 2024',
    thumbnail: '/thumbnails/thumbnail-dropout.svg',
    sections: [
      {
        heading: 'The Dropout Mechanism',
        headingRu: 'Механизм dropout',
        blocks: [
          { type: 'text', html: '<strong>Dropout</strong> randomly zeroes a fraction of neuron outputs during training. This prevents co-adaptation and forces the network to learn robust, distributed representations.', htmlRu: '<strong>Dropout</strong> случайным образом обнуляет часть выходов нейронов при обучении. Это предотвращает ко-адаптацию и заставляет сеть обучать надёжные распределённые представления.' },
          { type: 'formula', math: '\\hat{h}_i = r_i \\cdot h_i, \\quad r_i \\sim \\text{Bernoulli}(p)', label: 'Dropout mask', labelRu: 'Маска dropout' },
          { type: 'formula', math: 'h_{test} = p \\cdot h_{train} \\quad \\text{(inverted dropout: scale at train time)}', label: 'Inverted dropout scaling', labelRu: 'Инвертированное масштабирование dropout' },
          { type: 'chart', chart: 'line', title: 'Train vs. Test Accuracy: With vs. Without Dropout', titleRu: 'Точность обучения vs. теста: с Dropout vs. без', description: 'How dropout prevents overfitting', descriptionRu: 'Как dropout предотвращает переобучение', interactive: true },
        ],
      },
      {
        heading: 'Regularization Techniques',
        headingRu: 'Методы регуляризации',
        blocks: [
          { type: 'text', html: 'Beyond dropout, deep learning uses <strong>L2 weight decay</strong>, <strong>data augmentation</strong>, <strong>early stopping</strong>, and <strong>label smoothing</strong> to combat overfitting.', htmlRu: 'Помимо dropout, глубокое обучение использует <strong>L2 weight decay</strong>, <strong>аугментацию данных</strong>, <strong>раннюю остановку</strong> и <strong>сглаживание меток</strong> для борьбы с переобучением.' },
          { type: 'formula', math: 'L_{reg} = L + \\frac{\\lambda}{2} \\|w\\|^2', label: 'L2 regularization (weight decay)', labelRu: 'L2-регуляризация (weight decay)' },
          { type: 'chart', chart: 'area', title: 'Effect of Dropout Rate on Generalization', titleRu: 'Влияние dropout на обобщение', description: 'Finding the optimal dropout probability', descriptionRu: 'Поиск оптимальной вероятности dropout', interactive: true },
          { type: 'info', variant: 'amber', text: 'Dropout at 0.5 is standard for fully-connected layers. For conv layers, 0.2–0.3 is typical. Too much dropout underfits; too little fails to regularize.', textRu: 'Dropout 0.5 — стандарт для полносвязных слоёв. Для свёрточных слоёв типично 0.2–0.3. Слишком большой dropout недообучает; слишком малый не обеспечивает регуляризацию.' },
          { type: 'text', html: '<strong>DropConnect</strong> zeroes random weights instead of activations. <strong>Spatial dropout</strong> drops entire feature maps in CNNs, preserving spatial consistency.', htmlRu: '<strong>DropConnect</strong> обнуляет случайные веса вместо активаций. <strong>Пространственный dropout</strong> отключает целые карты признаков в CNN, сохраняя пространственную согласованность.' },
          { type: 'definition', title: 'Stochastic Depth', titleRu: 'Стохастическая глубина', math: 'h_l = h_{l-1} + p_l \\cdot F(h_{l-1}), \\quad p_l \\sim \\text{Bernoulli}(1 - \\frac{l}{L}(1-p_L))', note: 'Randomly skip entire layers during training. Deeper layers are dropped more often. Used in EfficientNet and modern architectures.', noteRu: 'Случайно пропускайте целые слои при обучении. Более глубокие слои отключаются чаще. Используется в EfficientNet и современных архитектурах.' },
        ],
      },
    ],
    conclusion: 'Dropout remains one of the simplest and most effective regularization techniques. Combined with weight decay and data augmentation, it forms the regularization backbone of most deep learning systems.',
    conclusionRu: 'Dropout остаётся одним из простейших и эффективнейших методов регуляризации. В сочетании с weight decay и аугментацией данных он составляет регуляризационную основу большинства систем глубокого обучения.',
    references: [
      { title: 'Dropout: A Simple Way to Prevent Neural Networks from Overfitting', authors: 'Srivastava et al., 2014', url: 'https://jmlr.org/papers/v15/srivastava14a.html' },
    ],
  },

  /* ---- 23. Transfer Learning ---- */
  {
    slug: 'transfer-learning',
    title: 'Transfer Learning',
    titleRu: 'Перенос обучения',
    subtitle: 'Leveraging Pretrained Models for New Tasks',
    subtitleRu: 'Использование предобученных моделей для новых задач',
    authors: 'Jared Wilber',
    date: 'November 2024',
    thumbnail: '/thumbnails/thumbnail-transfer.svg',
    sections: [
      {
        heading: 'Why Transfer Learning Works',
        headingRu: 'Почему перенос обучения работает',
        blocks: [
          { type: 'text', html: '<strong>Transfer learning</strong> reuses a model trained on a large source dataset (e.g., ImageNet) as the starting point for a different but related target task. The pretrained features are often generalizable.', htmlRu: '<strong>Перенос обучения</strong> использует модель, обученную на большом исходном наборе данных (напр., ImageNet), как отправную точку для другой, но связанной целевой задачи. Предобученные признаки часто обобщаемы.' },
          { type: 'chart', chart: 'architecture', title: 'Transfer Learning Pipeline', titleRu: 'Пайплайн переноса обучения', description: 'Pretrain on source → Fine-tune on target', descriptionRu: 'Предобучение на источнике → дообучение на цели', interactive: true },
          { type: 'text', html: 'There are three main strategies: <strong>feature extraction</strong> (freeze base, train head), <strong>fine-tuning</strong> (unfreeze some layers), and <strong>full fine-tuning</strong> (train everything with a small learning rate).', htmlRu: 'Существует три основные стратегии: <strong>извлечение признаков</strong> (заморозить базу, обучить голову), <strong>дообучение</strong> (разморозить часть слоёв) и <strong>полное дообучение</strong> (обучить всё с малым темпом обучения).' },
          { type: 'formula', math: '\\theta_{target} = \\theta_{source} - \\eta \\nabla L_{target}(\\theta_{source})', label: 'Fine-tuning from pretrained weights', labelRu: 'Дообучение от предобученных весов' },
        ],
      },
      {
        heading: 'Modern Transfer Learning: Foundation Models',
        headingRu: 'Современный перенос обучения: базовые модели',
        blocks: [
          { type: 'text', html: 'Modern NLP and vision are dominated by <strong>foundation models</strong> — large models pretrained on diverse data and adapted via fine-tuning or prompting.', htmlRu: 'Современные NLP и компьютерное зрение доминируются <strong>базовыми моделями</strong> — большими моделями, предобученными на разнообразных данных и адаптированными через дообучение или промптинг.' },
          { type: 'chart', chart: 'bar', title: 'Performance: From Scratch vs. Pretrained', titleRu: 'Качество: с нуля vs. предобученная', description: 'How transfer learning boosts performance with less data', descriptionRu: 'Как перенос обучения улучшает качество с меньшим объёмом данных', interactive: true },
          { type: 'formula', math: '\\text{LoRA}: W = W_0 + \\Delta W = W_0 + BA, \\quad B \\in \\mathbb{R}^{d \\times r}, A \\in \\mathbb{R}^{r \\times k}, r \\ll \\min(d,k)', label: 'LoRA: Low-Rank Adaptation', labelRu: 'LoRA: низкоранговая адаптация' },
          { type: 'info', variant: 'accent', text: 'LoRA freezes the original weights and injects trainable low-rank matrices — reducing trainable parameters by 10,000x while matching full fine-tuning performance.', textRu: 'LoRA замораживает исходные веса и внедряет обучаемые низкоранговые матрицы — уменьшая обучаемые параметры в 10 000 раз при сохранении качества полного дообучения.' },
          { type: 'text', html: '<strong>Adapter layers</strong> add small trainable modules between frozen layers. <strong>Prompt tuning</strong> learns continuous prompt embeddings while keeping the model frozen. All are parameter-efficient fine-tuning (PEFT) methods.', htmlRu: '<strong>Адаптерные слои</strong> добавляют малые обучаемые модули между замороженными слоями. <strong>Промпт-тюнинг</strong> обучает непрерывные эмбеддинги промптов при замороженной модели. Всё это методы параметрически эффективного дообучения (PEFT).' },
          { type: 'text', html: 'In practice, the most common pipeline is: 1) Choose a pretrained model (Hugging Face Hub), 2) Apply LoRA with rank 8-64, 3) Train on your data for a few epochs, 4) Merge LoRA weights back into the base model for inference.', htmlRu: 'На практике наиболее частый пайплайн: 1) Выбрать предобученную модель (Hugging Face Hub), 2) Применить LoRA с рангом 8–64, 3) Обучить на своих данных несколько эпох, 4) Объединить веса LoRA с базовой моделью для инференса.' },
        ],
      },
    ],
    conclusion: 'Transfer learning has democratized deep learning — enabling practitioners to achieve state-of-the-art results with minimal data and compute. Foundation models like GPT, BERT, and CLIP have made pretrained representations the default starting point.',
    conclusionRu: 'Перенос обучения демократизировал глубокое обучение — позволив достигать передовых результатов с минимальными данными и вычислениями. Базовые модели вроде GPT, BERT и CLIP сделали предобученные представления стандартной отправной точкой.',
    references: [
      { title: 'How transferable are features in deep neural networks?', authors: 'Yosinski et al., 2014', url: 'https://arxiv.org/abs/1411.1792' },
      { title: 'LoRA: Low-Rank Adaptation of Large Language Models', authors: 'Hu et al., 2021', url: 'https://arxiv.org/abs/2106.09685' },
    ],
  },

  /* ---- 24. Vanishing & Exploding Gradients ---- */
  {
    slug: 'vanishing-gradients',
    title: 'Vanishing & Exploding Gradients',
    titleRu: 'Затухающие и взрывающиеся градиенты',
    subtitle: 'The Optimization Challenges of Deep Networks',
    subtitleRu: 'Проблемы оптимизации глубоких сетей',
    authors: 'Jared Wilber',
    date: 'December 2024',
    thumbnail: '/thumbnails/thumbnail-gradients.svg',
    sections: [
      {
        heading: 'The Problem',
        headingRu: 'Проблема',
        blocks: [
          { type: 'text', html: 'During backpropagation through deep or recurrent networks, gradients are <strong>multiplied</strong> at each layer. If weights are small, gradients shrink exponentially (<strong>vanishing</strong>). If large, they grow (<strong>exploding</strong>).', htmlRu: 'При обратном распространении через глубокие или рекуррентные сети градиенты <strong>умножаются</strong> на каждом слое. Если веса малы, градиенты экспоненциально уменьшаются (<strong>затухание</strong>). Если велики — растут (<strong>взрыв</strong>).' },
          { type: 'formula', math: '\\frac{\\partial L}{\\partial w_1} = \\frac{\\partial L}{\\partial h_L} \\cdot \\prod_{l=2}^{L} \\frac{\\partial h_l}{\\partial h_{l-1}} \\cdot \\frac{\\partial h_1}{\\partial w_1}', label: 'Chain rule through L layers', labelRu: 'Цепное правило через L слоёв' },
          { type: 'chart', chart: 'line', title: 'Gradient Norm Across Layers', titleRu: 'Норма градиента по слоям', description: 'How gradients vanish or explode in deep networks', descriptionRu: 'Как градиенты затухают или взрываются в глубоких сетях', interactive: true },
        ],
      },
      {
        heading: 'Solutions',
        headingRu: 'Решения',
        blocks: [
          { type: 'text', html: 'Several innovations address this: <strong>ReLU activations</strong> (avoid sigmoid saturation), <strong>residual/skip connections</strong> (gradient highway), <strong>BatchNorm</strong> (normalize activations), <strong>gradient clipping</strong> (cap exploding gradients), and careful <strong>initialization</strong>.', htmlRu: 'Несколько инноваций решают эту проблему: <strong>активации ReLU</strong> (избегают насыщения сигмоиды), <strong>остаточные/skip-соединения</strong> (шоссе для градиентов), <strong>BatchNorm</strong> (нормализация активаций), <strong>обрезка градиентов</strong> (ограничение взрывающихся градиентов) и аккуратная <strong>инициализация</strong>.' },
          { type: 'formula', math: 'h_l = h_{l-1} + F(h_{l-1}) \\quad \\Rightarrow \\quad \\frac{\\partial h_L}{\\partial h_l} = 1 + \\frac{\\partial}{\\partial h_l}\\sum_{k=l}^{L-1} F(h_k)', label: 'Residual connection: gradient always ≥ 1', labelRu: 'Остаточное соединение: градиент всегда ≥ 1' },
          { type: 'formula', math: 'W \\sim \\mathcal{N}\\!\\left(0, \\frac{2}{n_{in}}\\right) \\quad \\text{(He initialization for ReLU)}', label: 'He initialization', labelRu: 'Инициализация He' },
          { type: 'chart', chart: 'area', title: 'Training Deep Networks: With vs. Without Residual Connections', titleRu: 'Обучение глубоких сетей: с vs. без остаточных соединений', description: 'How skip connections enable training of very deep networks', descriptionRu: 'Как skip-соединения обеспечивают обучение очень глубоких сетей', interactive: true },
          { type: 'info', variant: 'emerald', text: 'Gradient clipping: if ‖g‖ > threshold, scale g → g · (threshold / ‖g‖). Simple but essential for training RNNs and large language models.', textRu: 'Обрезка градиентов: если ‖g‖ > порога, масштабируем g → g · (порог / ‖g‖). Простой, но необходимый метод для обучения RNN и больших языковых моделей.' },
          { type: 'text', html: '<strong>DenseNet</strong> connects every layer to every other layer, providing even richer gradient flow than ResNet. <strong>Dense blocks + transition layers</strong> create highly parameter-efficient architectures.', htmlRu: '<strong>DenseNet</strong> соединяет каждый слой с каждым другим, обеспечивая ещё более богатый поток градиентов, чем ResNet. <strong>Плотные блоки + переходные слои</strong> создают высокоэффективные по параметрам архитектуры.' },
          { type: 'text', html: 'Modern LLM training combines all solutions: <strong>AdamW optimizer</strong> (adaptive LR + decoupled weight decay), <strong>RMSNorm</strong> (simplified LayerNorm), <strong>RoPE</strong> (rotary position embeddings), and <strong>gradient checkpointing</strong> (trades compute for memory).', htmlRu: 'Современное обучение LLM объединяет все решения: <strong>оптимизатор AdamW</strong> (адаптивный LR + раздельный weight decay), <strong>RMSNorm</strong> (упрощённый LayerNorm), <strong>RoPE</strong> (ротационные позиционные эмбеддинги) и <strong>градиентный чекпоинтинг</strong> (обмен вычислений на память).' },
        ],
      },
    ],
    conclusion: 'The vanishing/exploding gradient problem was the central obstacle to training deep networks. The solutions — ReLU, skip connections, normalization, and careful initialization — are the building blocks of every modern architecture.',
    conclusionRu: 'Проблема затухающих/взрывающихся градиентов была главным препятствием в обучении глубоких сетей. Решения — ReLU, skip-connections, нормализация и аккуратная инициализация — являются строительными блоками каждой современной архитектуры.',
    references: [
      { title: 'On the difficulty of training recurrent neural networks', authors: 'Pascanu, Mikolov, Bengio, 2013', url: 'https://arxiv.org/abs/1211.5063' },
      { title: 'Deep Residual Learning for Image Recognition', authors: 'He et al., 2015', url: 'https://arxiv.org/abs/1512.03385' },
    ],
  },

  /* ---- 25. K-Nearest Neighbors ---- */
  {
    slug: 'knn',
    title: 'K-Nearest Neighbors',
    titleRu: 'Метод k-ближайших соседей',
    subtitle: 'Classification & Regression by Local Similarity',
    subtitleRu: 'Классификация и регрессия по локальному сходству',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-knn.svg',
    sections: [
      {
        heading: 'The KNN Algorithm',
        headingRu: 'Алгоритм KNN',
        blocks: [
          { type: 'text', html: 'K-Nearest Neighbors is a <strong>metric method</strong> that classifies an object based on the majority class among its <strong>k closest neighbors</strong> in the feature space. Unlike linear models, KNN does not search for global patterns — it relies on the local assumption that similar objects have similar properties.', htmlRu: 'Метод k-ближайших соседей — это <strong>метрический метод</strong>, который классифицирует объект на основе класса большинства среди его <strong>k ближайших соседей</strong> в пространстве признаков. В отличие от линейных моделей, KNN не ищет глобальные закономерности — он опирается на локальное предположение, что похожие объекты имеют схожие свойства.' },
          { type: 'formula', math: '\hat{y} = \text{mode}\{y_i : x_i \in N_k(x)\}', label: 'KNN classification', labelRu: 'Классификация KNN' },
          { type: 'chart', chart: 'scatter', title: 'KNN Decision Boundaries for Different k', titleRu: 'Границы решения KNN для различных k', description: 'How the decision surface changes with the number of neighbors', descriptionRu: 'Как меняется поверхность решения при изменении числа соседей', interactive: true },
          { type: 'text', html: 'For <strong>regression</strong>, KNN predicts the average (or weighted average) of the target values of the k nearest neighbors. The choice of distance metric — Euclidean, Manhattan, or Minkowski — significantly affects results.', htmlRu: 'Для <strong>регрессии</strong> KNN предсказывает среднее (или взвешенное среднее) целевых значений k ближайших соседей. Выбор метрики расстояния — евклидово, манхэттенское или Минковского — существенно влияет на результаты.' },
          { type: 'formula', math: '\hat{y} = \frac{1}{k}\sum_{x_i \in N_k(x)} y_i', label: 'KNN regression', labelRu: 'Регрессия KNN' },
        ],
      },
      {
        heading: 'Efficient Neighbor Search',
        headingRu: 'Эффективный поиск соседей',
        blocks: [
          { type: 'text', html: 'A naive KNN implementation computes distances to <strong>all</strong> training points — O(n·d) per query. For large datasets, efficient search structures are critical: <strong>KD-trees</strong>, <strong>ball trees</strong>, and <strong>locality-sensitive hashing (LSH)</strong>.', htmlRu: 'Наивная реализация KNN вычисляет расстояния до <strong>всех</strong> обучающих точек — O(n·d) на запрос. Для больших данных критичны эффективные структуры поиска: <strong>KD-деревья</strong>, <strong>ball-деревья</strong> и <strong>локально-чувствительное хеширование (LSH)</strong>.' },
          { type: 'info', variant: 'amber', text: 'KNN is a lazy learner — it stores all training data and only computes at prediction time. This means zero training cost but potentially high inference cost.', textRu: 'KNN — ленивый алгоритм: он хранит все обучающие данные и вычисляет только при предсказании. Это означает нулевую стоимость обучения, но потенциально высокую стоимость инференса.' },
          { type: 'definition', title: 'Curse of Dimensionality', titleRu: 'Проклятие размерности', math: '\text{As } d \to \infty, \frac{\max\|x_i - x_j\|}{\min\|x_i - x_j\|} \to 1', note: 'In high dimensions, all points become equidistant — KNN loses discriminative power. Dimensionality reduction (PCA, t-SNE) is often applied first.', noteRu: 'В высоких размерностях все точки становятся равноудалёнными — KNN теряет различительную силу. Часто сначала применяют уменьшение размерности (PCA, t-SNE).' },
          { type: 'text', html: 'As the Yandex ML Handbook notes, KNN excels when the decision boundary is <strong>irregular</strong> and local patterns matter. However, it struggles with irrelevant features and high-dimensional data.', htmlRu: 'Как отмечает хендбук Яндекса по ML, KNN отлично работает, когда граница решения <strong>нерегулярна</strong> и важны локальные паттерны. Однако он плохо справляется с нерелевантными признаками и многомерными данными.' },
        ],
      },
    ],
    conclusion: 'KNN is a simple yet powerful non-parametric method. Its performance depends critically on the choice of k, distance metric, and feature scaling.',
    conclusionRu: 'KNN — простой, но мощный непараметрический метод. Его качество критически зависит от выбора k, метрики расстояния и масштабирования признаков.',
    references: [
      { title: 'Elements of Statistical Learning', authors: 'Hastie, Tibshirani, Friedman', url: 'https://hastie.su.domains/ElemStatLearn/' },
      { title: 'Метрические методы (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/metricheskie-metody' },
    ],
  },

  /* ---- 26. Gradient Boosting ---- */
  {
    slug: 'gradient-boosting',
    title: 'Gradient Boosting',
    titleRu: 'Градиентный бустинг',
    subtitle: 'Sequential Ensemble Learning on Decision Trees',
    subtitleRu: 'Последовательное ансамблевое обучение на решающих деревьях',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-boosting.svg',
    sections: [
      {
        heading: 'From Bagging to Boosting',
        headingRu: 'От бэггинга к бустингу',
        blocks: [
          { type: 'text', html: 'While Random Forest builds trees <strong>independently</strong> (bagging), boosting constructs a <strong>sequential</strong> ensemble where each new model corrects the errors of previous ones. Gradient Boosting on Decision Trees (GBDT) is the most powerful non-neural network family for tabular data.', htmlRu: 'Пока случайный лес строит деревья <strong>независимо</strong> (бэггинг), бустинг строит <strong>последовательный</strong> ансамбль, где каждая новая модель исправляет ошибки предыдущих. Градиентный бустинг на решающих деревьях (GBDT) — самое мощное семейство не-нейросетевых моделей для табличных данных.' },
          { type: 'formula', math: 'F_m(x) = F_{m-1}(x) + \eta \cdot h_m(x)', label: 'Boosting: sequential composition', labelRu: 'Бустинг: последовательная композиция' },
          { type: 'text', html: 'Each new tree is trained on the <strong>negative gradient</strong> (anti-gradient) of the loss function with respect to the current ensemble predictions. This generalizes the idea of fitting residuals to any differentiable loss function.', htmlRu: 'Каждое новое дерево обучается на <strong>антиградиенте</strong> функции потерь по текущим предсказаниям ансамбля. Это обобщает идею подгонки остатков на любую дифференцируемую функцию потерь.' },
          { type: 'formula', math: 'h_m = \arg\min_h \sum_{i=1}^{n} \left(-\frac{\partial L(y_i, F_{m-1}(x_i))}{\partial F_{m-1}(x_i)} - h(x_i)\right)^2', label: 'Fit tree to anti-gradient', labelRu: 'Подгонка дерева к антиградиенту' },
          { type: 'chart', chart: 'line', title: 'Training & Test Error vs. Number of Trees', titleRu: 'Ошибка обучения и теста vs. число деревьев', description: 'How boosting reduces error sequentially', descriptionRu: 'Как бустинг уменьшает ошибку последовательно', interactive: true },
        ],
      },
      {
        heading: 'XGBoost, LightGBM & CatBoost',
        headingRu: 'XGBoost, LightGBM и CatBoost',
        blocks: [
          { type: 'text', html: 'Three major GBDT implementations dominate: <strong>XGBoost</strong> (symmetric trees, level-wise growth), <strong>LightGBM</strong> (leaf-wise growth, histogram-based), and <strong>CatBoost</strong> (symmetric trees with ordered boosting for categorical features).', htmlRu: 'Три основные реализации GBDT доминируют: <strong>XGBoost</strong> (симметричные деревья, рост по уровням), <strong>LightGBM</strong> (рост по листьям, гистограммный) и <strong>CatBoost</strong> (симметричные деревья с упорядоченным бустингом для категориальных признаков).' },
          { type: 'info', variant: 'emerald', text: 'GBDT wins most Kaggle competitions on tabular data. It handles heterogeneous features, missing values, and categorical variables natively. Training is much faster than neural networks for typical tabular datasets.', textRu: 'GBDT выигрывает большинство соревнований Kaggle на табличных данных. Он нативно работает с разнородными признаками, пропущенными значениями и категориальными переменными. Обучение намного быстрее нейросетей для типичных табличных данных.' },
          { type: 'text', html: 'The <strong>learning rate</strong> η controls the contribution of each tree. Lower values require more trees but improve generalization. CatBoost can automatically select the learning rate using a pre-trained linear model on meta-features of the dataset.', htmlRu: '<strong>Темп обучения</strong> η контролирует вклад каждого дерева. Меньшие значения требуют больше деревьев, но улучшают обобщение. CatBoost может автоматически выбирать темп обучения с помощью предобученной линейной модели на метапризнаках данных.' },
          { type: 'formula', math: 'F_m(x) = F_{m-1}(x) + \eta \cdot h_m(x), \quad \eta \in (0, 1]', label: 'Learning rate in boosting', labelRu: 'Темп обучения в бустинге' },
          { type: 'info', variant: 'accent', text: 'Overfitting in boosting is controlled by: tree depth (typically 3-10), learning rate (0.01-0.3), subsample ratio, column sampling, and early stopping on a validation set.', textRu: 'Переобучение в бустинге контролируется: глубиной дерева (обычно 3–10), темпом обучения (0.01–0.3), долей подвыборки, сэмплированием столбцов и ранней остановкой на валидационной выборке.' },
        ],
      },
    ],
    conclusion: 'Gradient Boosting is the gold standard for tabular data. Its sequential error-correction approach, combined with decision trees, creates models that are both powerful and interpretable.',
    conclusionRu: 'Градиентный бустинг — золотой стандарт для табличных данных. Его подход последовательной коррекции ошибок в сочетании с решающими деревьями создаёт мощные и интерпретируемые модели.',
    references: [
      { title: 'Greedy Function Approximation: A Gradient Boosting Machine', authors: 'Jerome Friedman, 2001', url: 'https://jerryfriedman.su.domains/ftp/trebst.pdf' },
      { title: 'Градиентный бустинг (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/gradientnyj-busting' },
    ],
  },

  /* ---- 27. Hyperparameter Tuning ---- */
  {
    slug: 'hyperparameter-tuning',
    title: 'Hyperparameter Tuning',
    titleRu: 'Подбор гиперпараметров',
    subtitle: 'Grid Search, Random Search & Bayesian Optimization',
    subtitleRu: 'Перебор по сетке, случайный поиск и байесовская оптимизация',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-hypertuning.svg',
    sections: [
      {
        heading: 'Parameters vs. Hyperparameters',
        headingRu: 'Параметры vs. гиперпараметры',
        blocks: [
          { type: 'text', html: '<strong>Parameters</strong> are learned during training (weights, tree structure). <strong>Hyperparameters</strong> are set before training: tree depth, regularization strength, learning rate, number of neighbors in KNN. Choosing the right hyperparameters is crucial for model performance.', htmlRu: '<strong>Параметры</strong> настраиваются в процессе обучения (веса, структура дерева). <strong>Гиперпараметры</strong> фиксируются до начала обучения: глубина дерева, сила регуляризации, темп обучения, число соседей в KNN. Выбор правильных гиперпараметров критичен для качества модели.' },
          { type: 'definition', title: 'Validation Strategy', titleRu: 'Стратегия валидации', math: '\text{Split: Train} \to \text{Val} \to \text{Test} \quad \text{or} \quad \text{CV}', note: 'Never tune hyperparameters on the test set. Use a separate validation set or cross-validation.', noteRu: 'Никогда не настраивайте гиперпараметры на тестовой выборке. Используйте отдельную валидационную выборку или кросс-валидацию.' },
        ],
      },
      {
        heading: 'Search Strategies',
        headingRu: 'Стратегии поиска',
        blocks: [
          { type: 'text', html: '<strong>Grid Search</strong> evaluates all combinations on a fixed grid — exhaustive but slow. <strong>Random Search</strong> samples from distributions — surprisingly effective with fewer iterations. With 60 random trials, there is a 95% chance of hitting the top-5% region.', htmlRu: '<strong>Перебор по сетке</strong> оценивает все комбинации на фиксированной сетке — исчерпывающий, но медленный. <strong>Случайный поиск</strong> сэмплирует из распределений — удивительно эффективный при меньшем числе итераций. При 60 случайных испытаниях есть 95% шанс попасть в топ-5% область.' },
          { type: 'text', html: '<strong>Bayesian Optimization</strong> builds a probabilistic surrogate model (usually Gaussian Process) of the objective function and uses an <strong>acquisition function</strong> to balance exploration (high uncertainty) vs. exploitation (high predicted value). This dramatically reduces the number of evaluations needed.', htmlRu: '<strong>Байесовская оптимизация</strong> строит вероятностную суррогатную модель (обычно гауссовский процесс) целевой функции и использует <strong>функцию приобретения</strong> для баланса исследования (высокая неопределённость) и эксплуатации (высокое предсказанное значение). Это значительно уменьшает необходимое число вычислений.' },
          { type: 'formula', math: '\alpha(x) = \mu(x) + \kappa \cdot \sigma(x)', label: 'Acquisition function (UCB)', labelRu: 'Функция приобретения (UCB)' },
          { type: 'info', variant: 'emerald', text: 'Practical recommendation: start with Random Search (fast, broad coverage), then refine with Bayesian Optimization. Libraries: Optuna, Hyperopt, scikit-optimize.', textRu: 'Практическая рекомендация: начните со случайного поиска (быстро, широкое покрытие), затем уточните байесовской оптимизацией. Библиотеки: Optuna, Hyperopt, scikit-optimize.' },
        ],
      },
    ],
    conclusion: 'Hyperparameter tuning bridges the gap between a good algorithm and a great model. Random Search and Bayesian Optimization are the most efficient approaches for navigating the hyperparameter space.',
    conclusionRu: 'Подбор гиперпараметров — мост между хорошим алгоритмом и отличной моделью. Случайный поиск и байесовская оптимизация — самые эффективные подходы для навигации по пространству гиперпараметров.',
    references: [
      { title: 'Random Search for Hyper-Parameter Optimization', authors: 'Bergstra & Bengio, 2012', url: 'https://jmlr.org/papers/v13/bergstra12a.html' },
      { title: 'Подбор гиперпараметров (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/podbor-giperparametrov' },
    ],
  },

  /* ---- 28. Naive Bayes & Probabilistic Models ---- */
  {
    slug: 'naive-bayes',
    title: 'Naive Bayes & Probabilistic Models',
    titleRu: 'Наивный Байес и вероятностные модели',
    subtitle: 'Generative Classification Through Bayes Theorem',
    subtitleRu: 'Генеративная классификация через теорему Байеса',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-bayes.svg',
    sections: [
      {
        heading: 'The Probabilistic Approach',
        headingRu: 'Вероятностный подход',
        blocks: [
          { type: 'text', html: 'Probabilistic models treat classification as estimating <strong>P(y|x)</strong> — the posterior probability of class y given features x. By Bayes\' theorem, this decomposes into the <strong>likelihood</strong> P(x|y) and the <strong>prior</strong> P(y).', htmlRu: 'Вероятностные модели трактуют классификацию как оценку <strong>P(y|x)</strong> — апостериорной вероятности класса y при данных признаках x. По теореме Байеса это разлагается на <strong>правдоподобие</strong> P(x|y) и <strong>априорное</strong> P(y).' },
          { type: 'formula', math: 'P(y|x) = \frac{P(x|y) \cdot P(y)}{P(x)}', label: "Bayes' theorem", labelRu: 'Теорема Байеса' },
          { type: 'text', html: 'The <strong>Naive Bayes</strong> classifier makes the "naive" assumption that all features are <strong>conditionally independent</strong> given the class. Despite this strong assumption, it performs surprisingly well on text classification, spam detection, and many other tasks.', htmlRu: 'Классификатор <strong>наивного Байеса</strong> делает «наивное» предположение, что все признаки <strong>условно независимы</strong> при данном классе. Несмотря на это сильное допущение, он удивительно хорошо работает на классификации текстов, обнаружении спама и многих других задачах.' },
          { type: 'formula', math: 'P(y|x) \propto P(y) \prod_{j=1}^{d} P(x_j|y)', label: 'Naive Bayes assumption', labelRu: 'Предположение наивного Байеса' },
        ],
      },
      {
        heading: 'Variants & Applications',
        headingRu: 'Варианты и применения',
        blocks: [
          { type: 'text', html: '<strong>Multinomial NB</strong> models word counts — ideal for text. <strong>Gaussian NB</strong> assumes continuous features follow normal distributions. <strong>Bernoulli NB</strong> handles binary features. All variants are extremely fast to train and serve as strong baselines.', htmlRu: '<strong>Мультиномиальный NB</strong> моделирует частоты слов — идеален для текстов. <strong>Гауссовский NB</strong> предполагает нормальное распределение непрерывных признаков. <strong>Бернуллиевский NB</strong> работает с бинарными признаками. Все варианты крайне быстры в обучении и служат надёжными базовыми моделями.' },
          { type: 'definition', title: 'Generative vs. Discriminative', titleRu: 'Генеративный vs. дискриминативный', math: '\text{Generative: } P(x|y) \quad \text{vs.} \quad \text{Discriminative: } P(y|x)', note: 'Generative models (Naive Bayes) model the data distribution. Discriminative models (Logistic Regression) model the decision boundary directly. With enough data, discriminative usually wins.', noteRu: 'Генеративные модели (наивный Байес) моделируют распределение данных. Дискриминативные (логистическая регрессия) моделируют границу решения напрямую. При достаточном количестве данных дискриминативные обычно выигрывают.' },
          { type: 'info', variant: 'accent', text: 'Naive Bayes and Logistic Regression are a complementary pair: NB is generative and works well with little data; LR is discriminative and excels with more data. Both produce calibrated probabilities.', textRu: 'Наивный Байес и логистическая регрессия — дополняющая пара: NB генеративен и хорошо работает с малым объёмом данных; LR дискриминативна и превосходит при больших данных. Оба выдают калиброванные вероятности.' },
        ],
      },
    ],
    conclusion: 'Naive Bayes is a fast, interpretable generative classifier. Despite its simplicity, it remains competitive on text data and serves as an essential baseline in the ML toolkit.',
    conclusionRu: 'Наивный Байес — быстрый, интерпретируемый генеративный классификатор. Несмотря на простоту, он остаётся конкурентоспособным на текстовых данных и служит необходимой базовой моделью в инструментарии ML.',
    references: [
      { title: 'An Introduction to Information Retrieval', authors: 'Manning, Raghavan, Schütze', url: 'https://nlp.stanford.edu/IR-book/' },
      { title: 'Вероятностный подход в ML (Хендбук Яндекса)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/veroyatnostnyi-podkhod-v-ml' },
    ],
  },

  /* ---- 29. Graph Neural Networks ---- */
  {
    slug: 'gnn',
    title: 'Graph Neural Networks',
    titleRu: 'Графовые нейронные сети',
    subtitle: 'Learning on Graph-Structured Data',
    subtitleRu: 'Обучение на данных со структурой графа',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-gnn.svg',
    sections: [
      {
        heading: 'Graph Data & Tasks',
        headingRu: 'Графовые данные и задачи',
        blocks: [
          { type: 'text', html: 'Graph Neural Networks (GNNs) process data with <strong>graph structure</strong> — nodes (vertices) connected by edges. Applications include social networks, molecular graphs, knowledge graphs, and citation networks.', htmlRu: 'Графовые нейронные сети (GNN) обрабатывают данные со <strong>структурой графа</strong> — вершины, соединённые рёбрами. Применения: социальные сети, молекулярные графы, графы знаний и графы цитирований.' },
          { type: 'text', html: 'GNN tasks operate at three levels: <strong>node-level</strong> (classify individual nodes), <strong>edge-level</strong> (predict missing links), and <strong>graph-level</strong> (classify entire graphs, e.g., molecular properties).', htmlRu: 'Задачи GNN работают на трёх уровнях: <strong>уровень вершин</strong> (классификация отдельных вершин), <strong>уровень рёбер</strong> (предсказание пропущенных связей) и <strong>уровень графа</strong> (классификация целых графов, например свойств молекул).' },
          { type: 'info', variant: 'amber', text: 'GNNs must handle variable-size graphs and be invariant to node permutations — renumbering vertices should not change predictions.', textRu: 'GNN должны работать с графами переменного размера и быть инвариантны к перестановкам вершин — перенумерация вершин не должна менять предсказания.' },
        ],
      },
      {
        heading: 'Message Passing & Architectures',
        headingRu: 'Передача сообщений и архитектуры',
        blocks: [
          { type: 'text', html: 'The <strong>message passing</strong> paradigm is the foundation of spatial GNNs: each node aggregates information from its neighbors and updates its hidden state. After N layers, each node captures information from its N-hop neighborhood (receptive field).', htmlRu: 'Парадигма <strong>передачи сообщений</strong> — основа пространственных GNN: каждая вершина агрегирует информацию от соседей и обновляет своё скрытое состояние. После N слоёв каждая вершина захватывает информацию из N-окрестности (рецептивное поле).' },
          { type: 'formula', math: 'h_v^{(l+1)} = \text{UPDATE}\!\left(h_v^{(l)}, \text{AGG}\!\left(\{h_u^{(l)} : u \in \mathcal{N}(v)\}\right)\right)', label: 'Message passing update', labelRu: 'Обновление при передаче сообщений' },
          { type: 'text', html: 'Key architectures: <strong>GCN</strong> (spectral convolution via normalized adjacency), <strong>GraphSAGE</strong> (learnable aggregation with sampling), <strong>GAT</strong> (attention-weighted neighbor aggregation). GAT assigns learnable weights to neighbors, focusing on the most informative ones.', htmlRu: 'Ключевые архитектуры: <strong>GCN</strong> (спектральная свёртка через нормированную матрицу смежности), <strong>GraphSAGE</strong> (обучаемая агрегация с сэмплированием), <strong>GAT</strong> (агрегация соседей с весами внимания). GAT назначает обучаемые веса соседям, фокусируясь на наиболее информативных.' },
          { type: 'info', variant: 'emerald', text: 'GNNs are used in drug discovery (molecular property prediction), social network analysis, recommendation systems, fraud detection, and particle physics simulations.', textRu: 'GNN используются в разработке лекарств (предсказание свойств молекул), анализе социальных сетей, рекомендательных системах, обнаружении мошенничества и симуляциях физики элементарных частиц.' },
        ],
      },
    ],
    conclusion: 'Graph Neural Networks extend deep learning to graph-structured data. The message passing framework unifies various GNN architectures and enables learning on complex relational data.',
    conclusionRu: 'Графовые нейронные сети расширяют глубокое обучение на данные со структурой графа. Фреймворк передачи сообщений объединяет различные архитектуры GNN и позволяет обучаться на сложных реляционных данных.',
    references: [
      { title: 'Semi-Supervised Classification with Graph Convolutional Networks', authors: 'Kipf & Welling, 2017', url: 'https://arxiv.org/abs/1609.02907' },
      { title: 'Графовые нейронные сети (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/grafovye-nejronnye-seti' },
    ],
  },

  /* ---- 30. Diffusion Models ---- */
  {
    slug: 'diffusion-models',
    title: 'Diffusion Models',
    titleRu: 'Диффузионные модели',
    subtitle: 'Generative Modeling Through Gradual Denoising',
    subtitleRu: 'Генеративное моделирование через постепенное расшумление',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-diffusion.svg',
    sections: [
      {
        heading: 'Forward & Reverse Process',
        headingRu: 'Прямой и обратный процессы',
        blocks: [
          { type: 'text', html: 'Diffusion models generate data through a two-phase process: the <strong>forward process</strong> gradually adds Gaussian noise to data until it becomes pure noise, while the <strong>reverse process</strong> learns to denoise step-by-step to reconstruct the original data.', htmlRu: 'Диффузионные модели генерируют данные через двухфазный процесс: <strong>прямой процесс</strong> постепенно добавляет гауссовский шум к данным до чистого шума, а <strong>обратный процесс</strong> учится расшумлять шаг за шагом для восстановления исходных данных.' },
          { type: 'formula', math: 'q(x_t|x_{t-1}) = \mathcal{N}(x_t; \sqrt{1-\beta_t}x_{t-1}, \beta_t I)', label: 'Forward process (adding noise)', labelRu: 'Прямой процесс (добавление шума)' },
          { type: 'text', html: 'The model is trained to predict the <strong>noise</strong> added at each step. During generation, we start from random Gaussian noise and iteratively denoise. DDPM (Denoising Diffusion Probabilistic Models) is the foundational architecture.', htmlRu: 'Модель обучается предсказывать <strong>шум</strong>, добавленный на каждом шаге. При генерации мы начинаем со случайного гауссовского шума и итеративно расшумляем. DDPM (вероятностные модели дениоизующей диффузии) — базовая архитектура.' },
          { type: 'formula', math: 'L = \mathbb{E}_{t,x_0,\epsilon}\left[\|\epsilon - \epsilon_\theta(x_t, t)\|^2\right]', label: 'Training loss: predict the noise', labelRu: 'Функция потерь: предсказание шума' },
        ],
      },
      {
        heading: 'Guidance & Modern Architectures',
        headingRu: 'Управление генерацией и современные архитектуры',
        blocks: [
          { type: 'text', html: '<strong>Classifier guidance</strong> uses a pretrained noisy classifier to steer generation toward a desired class. <strong>Classifier-free guidance</strong> trains a single conditional model and interpolates between conditional and unconditional predictions — the standard approach in Stable Diffusion and DALL-E 2.', htmlRu: '<strong>Управление классификатором</strong> использует предобученный «шумный» классификатор для направления генерации к нужному классу. <strong>Управление без классификатора</strong> обучает единую условную модель и интерполирует между условными и безусловными предсказаниями — стандартный подход в Stable Diffusion и DALL-E 2.' },
          { type: 'info', variant: 'emerald', text: 'Diffusion models surpassed GANs in image quality (Dhariwal & Nichol, 2021). They power Stable Diffusion, DALL-E 2, Midjourney, and Imagen. Key advantage: better mode coverage and training stability.', textRu: 'Диффузионные модели превзошли GAN в качестве изображений (Dhariwal & Nichol, 2021). Они лежат в основе Stable Diffusion, DALL-E 2, Midjourney и Imagen. Ключевое преимущество: лучшее покрытие мод и стабильность обучения.' },
          { type: 'text', html: 'The noise <strong>schedule</strong> (linear, cosine, or learned) controls how noise is added across timesteps. Cosine schedules prevent the last steps from being too noisy. <strong>DDIM</strong> enables deterministic sampling with fewer steps, dramatically speeding up generation.', htmlRu: '<strong>Расписание</strong> шума (линейное, косинусное или обучаемое) контролирует, как шум добавляется по шагам. Косинусное расписание предотвращает слишком шумные последние шаги. <strong>DDIM</strong> обеспечивает детерминированное сэмплирование с меньшим числом шагов, значительно ускоряя генерацию.' },
        ],
      },
    ],
    conclusion: 'Diffusion models are the state-of-the-art in image generation. Their gradual denoising approach, combined with classifier-free guidance, produces remarkably diverse and high-quality samples.',
    conclusionRu: 'Диффузионные модели — передовой метод генерации изображений. Их подход постепенного расшумления в сочетании с управлением без классификатора создаёт удивительно разнообразные и качественные семплы.',
    references: [
      { title: 'Denoising Diffusion Probabilistic Models', authors: 'Ho, Jain, Abbeel, 2020', url: 'https://arxiv.org/abs/2006.11239' },
      { title: 'Диффузионные модели (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/diffuzionnye-modeli' },
    ],
  },

  /* ---- 31. Language Models ---- */
  {
    slug: 'language-models',
    title: 'Language Models',
    titleRu: 'Языковые модели',
    subtitle: 'From N-grams to Large Language Models (LLMs)',
    subtitleRu: 'От N-грамм к большим языковым моделям (LLM)',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-llm.svg',
    sections: [
      {
        heading: 'Language Modeling Fundamentals',
        headingRu: 'Основы языкового моделирования',
        blocks: [
          { type: 'text', html: 'A <strong>language model</strong> assigns probabilities to sequences of tokens. The core task is <strong>next-token prediction</strong>: given a context, predict the probability distribution over the next token. This simple objective powers GPT, BERT, and all modern LLMs.', htmlRu: '<strong>Языковая модель</strong> присваивает вероятности последовательностям токенов. Основная задача — <strong>предсказание следующего токена</strong>: по контексту предсказать распределение вероятностей следующего токена. Эта простая цель обеспечивает работу GPT, BERT и всех современных LLM.' },
          { type: 'formula', math: 'P(w_1, \ldots, w_T) = \prod_{t=1}^{T} P(w_t | w_1, \ldots, w_{t-1})', label: 'Autoregressive language model', labelRu: 'Авторегрессионная языковая модель' },
          { type: 'text', html: '<strong>Perplexity</strong> is the standard evaluation metric — the exponential of the average negative log-likelihood. Lower perplexity means the model is more confident and accurate in its predictions.', htmlRu: '<strong>Перплексия</strong> — стандартная метрика оценки — экспонента среднего отрицательного логарифма правдоподобия. Более низкая перплексия означает более уверенные и точные предсказания модели.' },
          { type: 'formula', math: '\text{PPL} = \exp\!\left(-\frac{1}{T}\sum_{t=1}^{T} \log P(w_t | w_{<t})\right)', label: 'Perplexity', labelRu: 'Перплексия' },
        ],
      },
      {
        heading: 'Modern LLMs & Scaling',
        headingRu: 'Современные LLM и масштабирование',
        blocks: [
          { type: 'text', html: 'Modern LLMs are transformer-based models scaled to billions of parameters: <strong>GPT</strong> (autoregressive generation), <strong>BERT</strong> (masked language modeling), <strong>T5</strong> (text-to-text), <strong>LLaMA</strong> (open-source). The <strong>scaling laws</strong> show that larger models trained on more data with more compute consistently improve performance.', htmlRu: 'Современные LLM — модели на основе трансформеров, масштабированные до миллиардов параметров: <strong>GPT</strong> (авторегрессионная генерация), <strong>BERT</strong> (маскированное языковое моделирование), <strong>T5</strong> (текст-в-текст), <strong>LLaMA</strong> (open-source). <strong>Законы масштабирования</strong> показывают, что большие модели, обученные на большем объёме данных с большими вычислениями, последовательно улучшают качество.' },
          { type: 'info', variant: 'emerald', text: 'Key LLM training techniques: RLHF (Reinforcement Learning from Human Feedback) aligns models with human preferences. DPO (Direct Preference Optimization) simplifies this. Constitutional AI adds self-critique.', textRu: 'Ключевые техники обучения LLM: RLHF (обучение с подкреплением по обратной связи от людей) выравнивает модели с человеческими предпочтениями. DPO (прямая оптимизация предпочтений) упрощает это. Constitutional AI добавляет самокритику.' },
          { type: 'text', html: 'Tokenization is the foundation of LLMs. <strong>Byte-Pair Encoding (BPE)</strong> and <strong>SentencePiece</strong> handle any language. <strong>KV-cache</strong> optimizes inference by caching key-value pairs. <strong>Mixture of Experts (MoE)</strong> enables scaling without proportional compute increase.', htmlRu: 'Токенизация — фундамент LLM. <strong>Byte-Pair Encoding (BPE)</strong> и <strong>SentencePiece</strong> работают с любым языком. <strong>KV-кеш</strong> оптимизирует инференс кешированием пар ключ-значение. <strong>Mixture of Experts (MoE)</strong> позволяет масштабировать без пропорционального роста вычислений.' },
          { type: 'info', variant: 'accent', text: 'LLMs exhibit emergent abilities at scale: chain-of-thought reasoning, in-context learning, and code generation. However, they still struggle with factual accuracy, counting, and spatial reasoning.', textRu: 'LLM проявляют эмерджентные способности при масштабировании: цепочка рассуждений, обучение в контексте и генерация кода. Однако они всё ещё испытывают трудности с фактологической точностью, подсчётом и пространственным мышлением.' },
        ],
      },
    ],
    conclusion: 'Language models have evolved from simple N-gram statistics to billion-parameter transformers. The scaling laws and RLHF alignment have created models that can generate, reason, and assist across virtually all text-based tasks.',
    conclusionRu: 'Языковые модели эволюционировали от простой N-граммной статистики до трансформеров с миллиардами параметров. Законы масштабирования и выравнивание RLHF создали модели, способные генерировать, рассуждать и помогать практически во всех текстовых задачах.',
    references: [
      { title: 'Scaling Laws for Neural Language Models', authors: 'Kaplan et al., 2020', url: 'https://arxiv.org/abs/2001.08361' },
      { title: 'Языковые модели (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/yazykovye-modeli' },
    ],
  },

  /* ---- 32. Recommender Systems ---- */
  {
    slug: 'recommender-systems',
    title: 'Recommender Systems',
    titleRu: 'Рекомендательные системы',
    subtitle: 'Collaborative Filtering, Matrix Factorization & Content-Based Methods',
    subtitleRu: 'Коллаборативная фильтрация, матричные разложения и контентные методы',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-recommender.svg',
    sections: [
      {
        heading: 'Types of Recommender Systems',
        headingRu: 'Типы рекомендательных систем',
        blocks: [
          { type: 'text', html: 'Recommender systems predict user preferences for items they haven\'t interacted with. <strong>Collaborative filtering</strong> uses user-item interaction patterns. <strong>Content-based</strong> methods use item features (genre, description). <strong>Hybrid</strong> systems combine both.', htmlRu: 'Рекомендательные системы предсказывают предпочтения пользователей для объектов, с которыми они не взаимодействовали. <strong>Коллаборативная фильтрация</strong> использует паттерны взаимодействий пользователь-объект. <strong>Контентные</strong> методы используют признаки объектов (жанр, описание). <strong>Гибридные</strong> системы объединяют оба подхода.' },
          { type: 'formula', math: '\hat{r}_{ui} = \mu + b_u + b_i + p_u^T q_i', label: 'Matrix factorization prediction', labelRu: 'Предсказание матричного разложения' },
          { type: 'text', html: '<strong>Matrix factorization</strong> (SVD, ALS) decomposes the user-item rating matrix into low-rank user and item embeddings. The dot product of these embeddings predicts the rating. This approach won the Netflix Prize.', htmlRu: '<strong>Матричное разложение</strong> (SVD, ALS) раскладывает матрицу оценок пользователь-объект в низкоранговые эмбеддинги пользователей и объектов. Скалярное произведение этих эмбеддингов предсказывает оценку. Этот подход выиграл Netflix Prize.' },
        ],
      },
      {
        heading: 'Modern Approaches',
        headingRu: 'Современные подходы',
        blocks: [
          { type: 'text', html: 'Deep learning enhanced recommenders include <strong>two-tower models</strong> (user and item towers), <strong>sequential recommenders</strong> (SASRec using transformers), and <strong>graph-based</strong> methods (PinSage using GNNs on user-item bipartite graphs).', htmlRu: 'Рекомендательные системы с глубоким обучением включают <strong>двухбашенные модели</strong> (башни пользователя и объекта), <strong>последовательные рекомендатели</strong> (SASRec на трансформерах) и <strong>графовые</strong> методы (PinSage на GNN по двудольным графам пользователь-объект).' },
          { type: 'info', variant: 'emerald', text: 'Evaluation metrics: NDCG (ranking quality), Recall@K (coverage), MRR (first relevant item). Production systems use a cascade: candidate generation → ranking → re-ranking.', textRu: 'Метрики оценки: NDCG (качество ранжирования), Recall@K (покрытие), MRR (первый релевантный объект). В продакшене используется каскад: генерация кандидатов → ранжирование → переранжирование.' },
          { type: 'definition', title: 'Cold Start Problem', titleRu: 'Проблема холодного старта', math: '\text{New user/item: no interactions} \to \text{use content features}', note: 'New users or items have no interaction history. Content-based methods or metadata-based embeddings provide initial recommendations.', noteRu: 'У новых пользователей или объектов нет истории взаимодействий. Контентные методы или эмбеддинги на основе метаданных обеспечивают начальные рекомендации.' },
        ],
      },
    ],
    conclusion: 'Recommender systems power modern platforms from Netflix to Spotify. Matrix factorization provides a strong baseline, while deep learning models with sequential and graph-based features achieve state-of-the-art performance.',
    conclusionRu: 'Рекомендательные системы обеспечивают работу современных платформ от Netflix до Spotify. Матричное разложение даёт надёжную базу, а модели глубокого обучения с последовательными и графовыми признаками достигают передового качества.',
    references: [
      { title: 'Matrix Factorization Techniques for Recommender Systems', authors: 'Koren, Bell, Volinsky, 2009', url: 'https://doi.org/10.1109/MC.2009.263' },
      { title: 'Введение в рекомендательные системы (Хендбук Яндекса)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/vvedenie-v-rekomendatelnye-sistemy' },
    ],
  },

  /* ---- 33. Clustering ---- */
  {
    slug: 'clustering',
    title: 'Clustering',
    titleRu: 'Кластеризация',
    subtitle: 'Unsupervised Grouping with K-Means, DBSCAN & Hierarchical Methods',
    subtitleRu: 'Неконтролируемая группировка: K-Means, DBSCAN и иерархические методы',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-clustering.svg',
    sections: [
      {
        heading: 'K-Means & Centroid Methods',
        headingRu: 'K-Means и центроидные методы',
        blocks: [
          { type: 'text', html: '<strong>K-Means</strong> partitions data into k clusters by iteratively assigning points to the nearest centroid and updating centroids. It minimizes the within-cluster sum of squares (inertia).', htmlRu: '<strong>K-Means</strong> разбивает данные на k кластеров, итеративно назначая точки ближайшему центроиду и обновляя центроиды. Он минимизирует сумму квадратов внутри кластеров (инерцию).' },
          { type: 'formula', math: '\min \sum_{k=1}^{K} \sum_{x_i \in C_k} \|x_i - \mu_k\|^2', label: 'K-Means objective', labelRu: 'Целевая функция K-Means' },
          { type: 'chart', chart: 'scatter', title: 'K-Means Convergence Animation', titleRu: 'Анимация сходимости K-Means', description: 'Watch clusters form as centroids update', descriptionRu: 'Наблюдайте, как формируются кластеры при обновлении центроидов', interactive: true },
          { type: 'info', variant: 'amber', text: 'K-Means assumes spherical clusters of similar size. It fails on elongated, nested, or variable-density clusters. Use DBSCAN or spectral clustering for these cases.', textRu: 'K-Means предполагает сферические кластеры похожего размера. Он не работает с вытянутыми, вложенными или кластерами переменной плотности. Используйте DBSCAN или спектральную кластеризацию.' },
        ],
      },
      {
        heading: 'DBSCAN & Hierarchical Clustering',
        headingRu: 'DBSCAN и иерархическая кластеризация',
        blocks: [
          { type: 'text', html: '<strong>DBSCAN</strong> finds density-connected clusters — groups of points with many neighbors within radius ε. It handles arbitrary shapes and identifies noise points (outliers). No need to specify k.', htmlRu: '<strong>DBSCAN</strong> находит плотно связанные кластеры — группы точек с множеством соседей в радиусе ε. Он работает с произвольными формами и определяет шумовые точки (выбросы). Не нужно задавать k.' },
          { type: 'definition', title: 'Silhouette Score', titleRu: 'Силуэтный коэффициент', math: 's(i) = \frac{b(i) - a(i)}{\max(a(i), b(i))}, \quad s \in [-1, 1]', note: 'Measures how similar a point is to its own cluster vs. the nearest cluster. Values near 1 indicate well-separated clusters.', noteRu: 'Измеряет, насколько точка похожа на свой кластер vs. ближайший кластер. Значения ближе к 1 указывают на хорошо разделённые кластеры.' },
          { type: 'info', variant: 'emerald', text: 'Choosing the right method: K-Means for spherical clusters, DBSCAN for noise + arbitrary shapes, hierarchical clustering for dendrogram analysis, spectral clustering for complex manifolds.', textRu: 'Выбор метода: K-Means для сферических кластеров, DBSCAN для шума + произвольных форм, иерархическая для анализа дендрограмм, спектральная для сложных многообразий.' },
        ],
      },
    ],
    conclusion: 'Clustering is a fundamental unsupervised technique for discovering structure in unlabeled data. The choice of algorithm depends on cluster shape, noise tolerance, and the need to specify k.',
    conclusionRu: 'Кластеризация — фундаментальный неконтролируемый метод для обнаружения структуры в немаркированных данных. Выбор алгоритма зависит от формы кластеров, устойчивости к шуму и необходимости задавать k.',
    references: [
      { title: 'A Density-Based Algorithm for Discovering Clusters (DBSCAN)', authors: 'Ester et al., 1996', url: 'https://www.aaai.org/Papers/KDD/1996/KDD96-037' },
      { title: 'Кластеризация (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/klasterizaciya' },
    ],
  },

  /* ---- 34. Time Series & ARIMA ---- */
  {
    slug: 'time-series',
    title: 'Time Series & ARIMA',
    titleRu: 'Временные ряды и ARIMA',
    subtitle: 'Forecasting with Trend, Seasonality & Autoregressive Models',
    subtitleRu: 'Прогнозирование с трендом, сезонностью и авторегрессионными моделями',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-timeseries.svg',
    sections: [
      {
        heading: 'Time Series Components',
        headingRu: 'Компоненты временных рядов',
        blocks: [
          { type: 'text', html: 'A time series decomposes into <strong>trend</strong> (long-term direction), <strong>seasonality</strong> (repeating patterns), and <strong>residuals</strong> (irregular noise). Stationarity — constant mean and variance over time — is a key assumption for classical models.', htmlRu: 'Временной ряд раскладывается на <strong>тренд</strong> (долгосрочное направление), <strong>сезонность</strong> (повторяющиеся паттерны) и <strong>остатки</strong> (нерегулярный шум). Стационарность — постоянное среднее и дисперсия — ключевое допущение классических моделей.' },
          { type: 'formula', math: 'y_t = T_t + S_t + R_t', label: 'Additive decomposition', labelRu: 'Аддитивная декомпозиция' },
          { type: 'chart', chart: 'line', title: 'Time Series Decomposition', titleRu: 'Декомпозиция временного ряда', description: 'Original series with trend, seasonal, and residual components', descriptionRu: 'Исходный ряд с компонентами тренда, сезонности и остатков', interactive: true },
          { type: 'definition', title: 'ADF Test (Stationarity)', titleRu: 'Тест ADF (стационарность)', math: 'H_0: \text{unit root exists (non-stationary)}', note: 'p-value < 0.05 rejects non-stationarity. Non-stationary series require differencing before modeling.', noteRu: 'p-value < 0.05 отклоняет нестационарность. Нестационарные ряды требуют дифференцирования перед моделированием.' },
        ],
      },
      {
        heading: 'ARIMA Models',
        headingRu: 'Модели ARIMA',
        blocks: [
          { type: 'text', html: '<strong>ARIMA(p, d, q)</strong> combines three components: <strong>AR(p)</strong> — autoregression on p past values, <strong>I(d)</strong> — d differences to achieve stationarity, <strong>MA(q)</strong> — moving average of q past errors. SARIMA adds seasonal terms.', htmlRu: '<strong>ARIMA(p, d, q)</strong> объединяет три компонента: <strong>AR(p)</strong> — авторегрессия на p прошлых значениях, <strong>I(d)</strong> — d разностей для стационарности, <strong>MA(q)</strong> — скользящее среднее q прошлых ошибок. SARIMA добавляет сезонные члены.' },
          { type: 'formula', math: '\text{ARIMA}(p,d,q): \phi(B)(1-B)^d y_t = \theta(B)\epsilon_t', label: 'ARIMA model', labelRu: 'Модель ARIMA' },
          { type: 'info', variant: 'emerald', text: 'For modern forecasting, gradient boosted trees (with lag features) and transformer-based models often outperform classical ARIMA on large datasets. Prophet (Meta) handles seasonality automatically.', textRu: 'Для современного прогнозирования градиентный бустинг (с лаговыми признаками) и модели на основе трансформеров часто превосходят классическую ARIMA на больших данных. Prophet (Meta) автоматически обрабатывает сезонность.' },
        ],
      },
    ],
    conclusion: 'Time series analysis combines classical statistics (ARIMA, exponential smoothing) with modern ML. Understanding stationarity, seasonality, and the train/test split for temporal data is essential.',
    conclusionRu: 'Анализ временных рядов объединяет классическую статистику (ARIMA, экспоненциальное сглаживание) с современным ML. Понимание стационарности, сезонности и разбиения на обучающую/тестовую выборки для временных данных необходимо.',
    references: [
      { title: 'Time Series Analysis', authors: 'James Hamilton', url: 'https://press.princeton.edu/books/hardcover/9780691219424/time-series-analysis' },
      { title: 'Временные ряды (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/vremennye-ryady' },
    ],
  },

  /* ---- 35. Ranking ---- */
  {
    slug: 'ranking',
    title: 'Learning to Rank',
    titleRu: 'Задача ранжирования',
    subtitle: 'Pointwise, Pairwise & Listwise Approaches with NDCG',
    subtitleRu: 'Поточечный, попарный и списочный подходы с NDCG',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-ranking.svg',
    sections: [
      {
        heading: 'The Ranking Problem',
        headingRu: 'Задача ранжирования',
        blocks: [
          { type: 'text', html: 'In ranking tasks, the goal is not to predict individual labels but to produce a <strong>correct ordering</strong> of items. Search engines, product recommendations, and ad placement are classic ranking problems.', htmlRu: 'В задачах ранжирования цель — не предсказать отдельные метки, а построить <strong>правильный порядок</strong> объектов. Поисковые системы, рекомендации товаров и размещение рекламы — классические задачи ранжирования.' },
          { type: 'text', html: 'Three approaches: <strong>Pointwise</strong> (treat each item independently — regression/classification), <strong>Pairwise</strong> (learn from pairs of items — which should rank higher), and <strong>Listwise</strong> (optimize the entire ranking list directly).', htmlRu: 'Три подхода: <strong>Поточечный</strong> (каждый объект независимо — регрессия/классификация), <strong>Попарный</strong> (обучение на парах объектов — какой должен быть выше) и <strong>Списочный</strong> (оптимизация всего списка ранжирования напрямую).' },
          { type: 'formula', math: '\text{DCG@k} = \sum_{i=1}^{k} \frac{2^{rel_i} - 1}{\log_2(i+1)}', label: 'Discounted Cumulative Gain', labelRu: 'Дисконтированная накопленная выгода' },
          { type: 'definition', title: 'NDCG (Normalized DCG)', titleRu: 'NDCG (нормированный DCG)', math: '\text{NDCG@k} = \frac{\text{DCG@k}}{\text{IDCG@k}}, \quad \text{NDCG} \in [0, 1]', note: 'NDCG measures ranking quality relative to the ideal ranking. It rewards relevant items appearing early in the list.', noteRu: 'NDCG измеряет качество ранжирования относительно идеального. Он награждает релевантные объекты, появляющиеся в начале списка.' },
        ],
      },
      {
        heading: 'GBDT for Ranking',
        headingRu: 'GBDT для ранжирования',
        blocks: [
          { type: 'text', html: 'Gradient Boosting is the standard approach for ranking. Libraries like <strong>LambdaMART</strong> (LambdaRank + MART) optimize NDCG directly using pairwise lambda gradients. CatBoost supports ranking with its YetiRank and PairLogit loss functions.', htmlRu: 'Градиентный бустинг — стандартный подход для ранжирования. Библиотеки вроде <strong>LambdaMART</strong> (LambdaRank + MART) оптимизируют NDCG напрямую через попарные лямбда-градиенты. CatBoost поддерживает ранжирование с функциями потерь YetiRank и PairLogit.' },
          { type: 'info', variant: 'accent', text: 'Search ranking at Yandex and Google uses GBDT-based models. Each query-document pair gets features (BM25, PageRank, click-through rate), and the model learns to rank documents by relevance.', textRu: 'Поисковое ранжирование в Яндексе и Google использует модели на основе GBDT. Каждая пара запрос-документ получает признаки (BM25, PageRank, частота кликов), и модель учится ранжировать документы по релевантности.' },
        ],
      },
    ],
    conclusion: 'Learning to Rank transforms classification into ordering. NDCG is the gold standard metric, and gradient boosting with pairwise losses is the dominant approach in production search and recommendation systems.',
    conclusionRu: 'Обучение ранжированию преобразует классификацию в упорядочение. NDCG — золотой стандарт метрики, а градиентный бустинг с попарными потерями — доминирующий подход в продакшен-системах поиска и рекомендаций.',
    references: [
      { title: 'From RankNet to LambdaRank to LambdaMART', authors: 'Christopher Burges, 2010', url: 'https://www.microsoft.com/en-us/research/publication/from-ranknet-to-lambdarank-to-lambdamart-an-overview/' },
      { title: 'Задача ранжирования (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/zadacha-ranzhirovaniya' },
    ],
  },

  /* ---- 36. Knowledge Distillation ---- */
  {
    slug: 'knowledge-distillation',
    title: 'Knowledge Distillation',
    titleRu: 'Дистилляция знаний',
    subtitle: 'Compressing Large Models into Smaller Ones',
    subtitleRu: 'Сжатие больших моделей в меньшие',
    authors: 'Yandex ML Handbook',
    date: 'June 2025',
    thumbnail: '/thumbnails/thumbnail-distillation.svg',
    sections: [
      {
        heading: 'Teacher-Student Framework',
        headingRu: 'Фреймворк учитель-ученик',
        blocks: [
          { type: 'text', html: '<strong>Knowledge distillation</strong> transfers knowledge from a large, complex <strong>teacher model</strong> to a smaller, efficient <strong>student model</strong>. The student learns to mimic the teacher\'s output distribution (soft labels), not just the hard class labels.', htmlRu: '<strong>Дистилляция знаний</strong> передаёт знания от большой сложной <strong>модели-учителя</strong> к меньшей эффективной <strong>модели-ученику</strong>. Ученик учится воспроизводить распределение выхода учителя (мягкие метки), а не только жёсткие метки классов.' },
          { type: 'formula', math: 'L_{KD} = \alpha \cdot L_{CE}(y, \hat{y}) + (1-\alpha) \cdot T^2 \cdot D_{KL}(\sigma(z_t/T) \| \sigma(z_s/T))', label: 'Distillation loss', labelRu: 'Функция потерь дистилляции' },
          { type: 'text', html: 'The <strong>temperature</strong> T > 1 softens the teacher\'s probability distribution, revealing the "dark knowledge" — the relative ordering of incorrect classes that the teacher learned. This soft information is what makes distillation so effective.', htmlRu: '<strong>Температура</strong> T > 1 смягчает распределение вероятностей учителя, раскрывая «тёмное знание» — относительный порядок некорректных классов, который учитель выучил. Эта мягкая информация делает дистилляцию столь эффективной.' },
        ],
      },
      {
        heading: 'Beyond Logits: Modern Distillation',
        headingRu: 'За пределами логитов: современная дистилляция',
        blocks: [
          { type: 'text', html: 'Modern distillation transfers more than logits: <strong>feature distillation</strong> (intermediate representations), <strong>attention transfer</strong> (attention maps), <strong>relational distillation</strong> (relationships between samples), and <strong>self-distillation</strong> (model distills into itself across epochs).', htmlRu: 'Современная дистилляция передаёт больше, чем логиты: <strong>дистилляция признаков</strong> (промежуточные представления), <strong>перенос внимания</strong> (карты внимания), <strong>реляционная дистилляция</strong> (отношения между примерами) и <strong>самодистилляция</strong> (модель дистиллирует себя через эпохи).' },
          { type: 'info', variant: 'emerald', text: 'Distillation is key for deploying LLMs on edge devices. DistilBERT retains 97% of BERT\'s performance with 40% fewer parameters and 60% faster inference. TinyBERT and MobileBERT push further.', textRu: 'Дистилляция — ключ к развертыванию LLM на edge-устройствах. DistilBERT сохраняет 97% качества BERT при на 40% меньшем числе параметров и на 60% более быстром инференсе. TinyBERT и MobileBERT идут ещё дальше.' },
          { type: 'info', variant: 'accent', text: 'In LLM distillation, smaller models (Phi, Gemma) are trained on outputs of larger models (GPT-4, Claude). This creates capable small models that run on phones and laptops.', textRu: 'В дистилляции LLM меньшие модели (Phi, Gemma) обучаются на выходах больших моделей (GPT-4, Claude). Это создаёт способные маленькие модели, работающие на телефонах и ноутбуках.' },
        ],
      },
    ],
    conclusion: 'Knowledge distillation enables deploying powerful models at reduced cost. By transferring soft labels, intermediate features, and structural knowledge, small students can closely match large teachers.',
    conclusionRu: 'Дистилляция знаний позволяет развертывать мощные модели с уменьшенными затратами. Передавая мягкие метки, промежуточные признаки и структурные знания, маленькие ученики могут близко приближаться к большим учителям.',
    references: [
      { title: 'Distilling the Knowledge in a Neural Network', authors: 'Hinton, Vinyals, Dean, 2015', url: 'https://arxiv.org/abs/1503.02531' },
      { title: 'Дистилляция знаний (Хендбук Яндекса по ML)', authors: 'Яндекс Практикум', url: 'https://education.yandex.ru/handbook/ml/article/distillyaciya-znanij' },
    ],
  },
]

/** Lookup helper */
export function getChapter(slug: string): ArticleChapter | undefined {
  return chapters.find((c) => c.slug === slug)
}
